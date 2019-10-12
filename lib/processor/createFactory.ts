import fs from 'fs'
import { ncp } from 'ncp'
import path from 'path'
import colors from 'colors'
import ora from 'ora'

export interface IResult {
  success: boolean,
  msg: string,
}

async function createPage(config, choices, spinning: ora.Ora): Promise<IResult> {

  const { page, type } = choices
  const sourcePath = path.resolve(__dirname, `../../templates/${config.templateName}/${type}/${page}`)
  const targetPath = `${process.cwd()}/src/view/${type}/${page}`

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
        msg: colors.green(`${type}:${page} created!`),
      })
    });
  })
}

export default {
  createPage,
  createComponent: createPage,
}