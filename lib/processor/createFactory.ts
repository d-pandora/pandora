import fs from 'fs'
import { ncp } from 'ncp'
import path from 'path'
import colors from 'colors'
import ora from 'ora'

export interface IResult {
  success: boolean,
  msg: string,
}

async function createPage(config: { templateName: string }, choices: any, spinning: ora.Ora): Promise<IResult> {

  const { page, type, component } = choices
  const targetName = type === 'pages' ? page : component
  const sourcePath = path.resolve(__dirname, `../../templates/${config.templateName}/${type}/${targetName}`)
  const targetPath = `${process.cwd()}/src/view/${type}/${targetName}`

  const tagertContainer = `${process.cwd()}/src/view/${type}`
  if (!fs.existsSync(tagertContainer)) {
    fs.mkdirSync(tagertContainer)
  }

  spinning.info(`copy from ${sourcePath} to ${targetPath}`)

  return new Promise((resolve, reject) => {
    ncp(sourcePath, targetPath, err => {
      if (err) {
        resolve({
          success: false,
          msg: colors.red(`build fail!, ${err}`),
        })
      }
      resolve({
        success: true,
        msg: colors.green(`${type}:${targetName} created!`),
      })
    });
  })
}

export default {
  createPage,
  createComponent: createPage,
}