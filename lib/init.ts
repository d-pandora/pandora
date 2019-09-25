#!/usr/bin/env node
import commander from 'commander'
import inquirer from 'inquirer'
import { ncp } from 'ncp'
import ora from 'ora'
import path from 'path'
import fs from 'fs'
import colors from 'colors'

const templatesPath = path.resolve(__dirname, '../templates')

const templates = fs.readdirSync(templatesPath)

commander.command('init')
.option('-n, --name', 'project name')
.description('init a project')
.alias('i')
.action(async (option) => {

  const promps = [
    {
      type: 'input',
      name: 'projectName',
      message: 'please input you project name:'
    },
    {
      type: 'list',
      name: 'template',
      message: 'please selet a template?',
      choices: templates,
      when: function (answers: any) {
        return answers.projectName !== '';
      }
    },
  ];

  async function inquire () {

    const result = await inquirer.prompt(promps)

    const { template, projectName } = result
  
    if (!projectName) {
      console.log(colors.red('please input your project name!'), '\n')
      inquire()
      return
    }
  
    const spinning = ora('start init project ing...')
  
    spinning.start()
    ncp(`${templatesPath}/${template}/project`, `${projectName}`, err => {
      if (err) {
        console.log(colors.red(`build fail!, ${err}`));
        process.exit();
      }
      spinning.stop()
  
      console.log(colors.green('Success! Inside that directory, you can run several commands:'));
  
      console.log(colors.green(`yarn install`));
      console.log('  install the node_mdules')
      console.log(colors.green(`yarn run web`));
      console.log('  start web page')
      console.log(colors.green(`yarn run server`));
      console.log('  start server')
  
    });
  }

  inquire()

})