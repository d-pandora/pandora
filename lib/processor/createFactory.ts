import fs from 'fs'
import { ncp } from 'ncp'
import path from 'path'
import colors, { white } from 'colors'
import ora from 'ora'
import replace from 'stream-replace'

export interface IResult {
  success: boolean,
  msg: string,
}

function createComponent(templateName: string, choices: any, spinning: ora.Ora): Promise<IResult> {

  const { type, component } = choices
  const sourcePath = path.resolve(__dirname, `../../templates/${templateName}/${type}/${component}`)
  const targetPath = `${process.cwd()}/src/view/${type}/${component}`

  const tagertContainer = `${process.cwd()}/src/view/${type}`
  if (!fs.existsSync(tagertContainer)) {
    fs.mkdirSync(tagertContainer)
  }
  spinning.info(`copy from ${sourcePath} to ${targetPath}`)
  return execNcp(sourcePath, targetPath)

}

function createPage(templateName: string, choices: any, spinning: ora.Ora): Promise<IResult> {

  const { page, type, pagedir, moduleName } = choices
  const sourcePath = path.resolve(__dirname, `../../templates/${templateName}/${type}/${page}`)
  let targetPath = `${process.cwd()}/src/view/${type}`

  const dirs = pagedir.split('/')

  while(dirs.length) {
    const dir = dirs.shift()
    targetPath = `${targetPath}/${dir}`
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath)
    }
  }

  spinning.info(`copy from ${sourcePath} to ${targetPath}`)

  return execNcp(sourcePath, targetPath, moduleName)
}



function execNcp (sourcePath: string, targetPath: string, moduleName?: string): Promise<IResult> {
  return new Promise((resolve, reject) => {
    ncp(sourcePath, targetPath, {
      transform: function(reader, writer) {
        if (moduleName) {
          const replaceName = sourcePath.slice(sourcePath.lastIndexOf('/') + 1)
          const UpperReplaceName = replaceName.replace(/^\S/, s => s.toUpperCase())
          const UpperCaseMoudleName = moduleName.replace(/^\S/, s => s.toUpperCase())
          const replaceNameReg = new RegExp(replaceName, "g")
          const UpperReplaceNameReg = new RegExp(UpperReplaceName, "g")
          reader.pipe(replace(replaceNameReg, moduleName)).pipe(replace(UpperReplaceNameReg, UpperCaseMoudleName)).pipe(writer);
        } else {
          reader.pipe(writer)
        }
      }
    }, err => {
      if (err) {
        resolve({
          success: false,
          msg: colors.red(`build fail!, ${err}`),
        })
      }
      resolve({
        success: true,
        msg: colors.green(`${moduleName} created!`),
      })
    });
  })
}

export default {
  createPage,
  createComponent,
}