#!/usr/bin/env node
import commander from 'commander'
import inquirer from 'inquirer'
import { ncp } from 'ncp'
import ora from 'ora'
import path from 'path'
import fs from 'fs'
import colors from 'colors'

import createFactory from './processor/createFactory'

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

  const config = require(`${cwd}/package.json`)

  const componentsPath = path.resolve(__dirname, `../templates/${config.templateName}/components`)
  const components = fs.readdirSync(`${componentsPath}`)

  const pagesPath = path.resolve(__dirname, `../templates/${config.templateName}/pages`)
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
    {
      type: 'list',
      name: 'routes',
      message: 'link page to routes?',
      choices: ['Yes', 'No'],
      when: function (answers: any) {
        return pages.indexOf(answers.type) > -1;
      }
    },
  ];

  async function inquire () {

    const choices = await inquirer.prompt(promps)
  
    const spinning = ora('start creating...')

    let processor = createFactory.createComponent

    switch(choices.type) {
      case 'components':
          processor = createFactory.createComponent
        break
      case 'pages':
        processor = createFactory.createPage
    }

    spinning.start()
    const result = await processor(config, choices, spinning)

    if (result.success) {
      handleSuccess(result.msg)
    } else {
      handleFailed(result.msg)
    }
    spinning.stop()

    function handleSuccess(msg: string) {
      spinning.succeed(msg)
      process.exit();
    }

    function handleFailed(msg: string) {
      spinning.fail(msg);
      process.exit();
    }

  }

  inquire()

})
