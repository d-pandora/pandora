const fs = require('fs')
const path = require('path')

const startReg = /^\@start/
const nameReg = /^\@name/
const prefixReg = /^\@prefix/
const contentReg = /^\@content/
const endReg = /^\@end/
const descriptionReg = /^\@description/


const fileRecursive = (filePath, isTemplateDir) => {
  const files = fs.readdirSync(filePath)
  return Promise.all(files.map(filename => {
    const filedir = path.join(filePath, filename);
    const isTemplate = isTemplateDir || filename.indexOf('__template__') !== -1
    return new Promise((resolve, reject) => {
      fs.stat(filedir, (eror,stats) => {
        if(eror){
          console.warn('获取文件stats失败');
        }else{
          const isFile = stats.isFile();//是文件
          const isDir = stats.isDirectory();//是文件夹
          if(isDir){
            resolve(fileRecursive(filedir, isTemplate));//递归，如果是文件夹，就继续遍历该文件夹下面的文件
          }
          if(isFile){
            if (isTemplate) {
              resolve(filedir)
            } else {
              resolve(false)
            }
          }
        }
      })
    })
  }))
}

const templates = {}

const flatten = arr => arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatten(val) : val), []);


fileRecursive(path.resolve(__dirname, './src')).then((result) => {
  result = flatten(result)
  result = result.filter((item) => item)
  Promise.all(result.map(fileDir => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileDir, 'utf8', (err, data) => {
        if (err) throw err;
        resolve(data)
      });
    })
  })).then((files) => {
    files.map(file => {
      const lines = file.toString().split(/\n/)
      let temp = {}
      let iscontent = false
      lines.map((line, index) => {
        if (line.match(startReg)) {
          temp = {}
        } else if (line.match(nameReg)) {
          temp.name = line.slice(5).trim()
        } else if (line.match(prefixReg)) {
          temp.prefix = line.slice(7).trim()
        } else if (line.match(contentReg)) {
          temp.content = []
          iscontent = true
        } else if (line.match(descriptionReg)) {
          temp.description = line.slice(12).trim()
        } else if (line.match(endReg)) {
          templates[temp.name] = {
            prefix: `@${temp.prefix || temp.name}`,
            body: temp.content,
            description: temp.description,
          }
          iscontent = false
        } else {
          iscontent && temp.content.push(line)
        }
      })
    })
    fs.writeFile(path.resolve(__dirname, 'snippets.json'), JSON.stringify(templates, null, 2))
  })
})
