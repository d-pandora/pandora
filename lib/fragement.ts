#!/usr/bin/env node
import commander from 'commander'
import inquirer from 'inquirer'
import { ncp } from 'ncp'
import ora from 'ora'
import path from 'path'
import fs from 'fs'
import colors from 'colors'

commander.command('create')
.option('-c, --create', 'create a new component')
.description('create a new component')
.alias('c')
.action(async (option) => {

  const cwd = process.cwd()

  if (!fs.existsSync(`${cwd}/package.json`)) {
    console.log('.....请在项目根目录下进行操作')
    return
  }

  const template = require(`${cwd}/package.json`)

  const componentsPath = path.resolve(__dirname, `../templates/${template.templateName}/components`)
  const components = fs.readdirSync(`${componentsPath}`)

  const pagesPath = path.resolve(__dirname, `../templates/${template.templateName}/pages`)
  const pages = fs.readdirSync(`${pagesPath}`)


  const promps = [
    {
      type: 'list',
      name: 'type',
      message: 'please selet the copy files type page or component?',
      choices: ['pages', 'components'],
    },
    {
      type: 'list',
      name: 'component',
      message: 'please selet a component?',
      choices: components,
      when: function (answers: any) {
        return answers.type === 'components';
      }
    },
    {
      type: 'list',
      name: 'page',
      message: 'please selet a page?',
      choices: pages,
      when: function (answers: any) {
        return answers.type === 'pages';
      }
    },
  ];

  async function inquire () {

    const result = await inquirer.prompt(promps)

    const { component, page, type } = result
  
    const spinning = ora('start init project ing...')


    const path = type === 'components' ? componentsPath : pagesPath

    const targetPath = type === 'components' ? `${process.cwd()}/src/view/components/${component}` : `${process.cwd()}/src/view/pages/${page}`

    const tagertContainer = type === 'components' ? `${process.cwd()}/src/view/components` : `${process.cwd()}/src/view/pages`
    if (!fs.existsSync(tagertContainer)) {
      fs.mkdirSync(tagertContainer)
    }

    spinning.start()
    ncp(`${path}/${type === 'components' ? component : page}`, targetPath, err => {
      if (err) {
        console.log(colors.red(`build fail!, ${err}`));
        process.exit();
      }
      spinning.stop()
  
      console.log(colors.green('create success!'));
  
    });
  }

  inquire()

})
