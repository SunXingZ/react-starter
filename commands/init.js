const { prompt } = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const fs = require('fs')
const path = require('path')

const option = program.parse(process.argv).args[0];
const templates = require(`${__dirname}/../templates`);
const templatesNames = Object.keys(templates) || [];

let defaultTemplate = templatesNames[0];
let defaultName = typeof option === 'string' ? option : 'react_project';
let defaultVersion = '1.0.0';
let defaultDescription = defaultName;
let defaultAuthor = 'react';

const question = [
  {
    type: 'list',
    name: 'template',
    message: '请选择一个项目模版',
    choices: templatesNames,
    default: defaultTemplate,
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: defaultName,
    filter(val) {
      return val.trim()
    },
    validate(val) {
      const validate = (val.trim().split(" ")).length === 1
      return validate || '项目名称中不能包含空格';
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'version',
    message: '请输入项目版本号',
    default: defaultVersion,
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述',
    default: defaultDescription,
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'author',
    message: '请输入项目作者',
    default: defaultAuthor,
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  }
];

module.exports = prompt(question).then(({ template, name, version, description, author }) => {
  const gitPlace = templates[template]['place'];
  const gitBranch = templates[template]['branch'];
  const spinner = ora('正在下载项目模版，请稍后...');
  spinner.start();
  download(`${gitPlace}${gitBranch}`, `./${name}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    fs.readFile(`./${name}/package.json`, 'utf8', function (err, data) {
      if (err) {
        spinner.stop();
        console.error(' ' + err);
        return;
      }
      spinner.text = "正在更新package.json";
      const packageJson = JSON.parse(data);
      packageJson.name = name;
      packageJson.version = version;
      packageJson.description = description;
      packageJson.author = author;
      var updatePackageJson = JSON.stringify(packageJson, null, 2);
      fs.writeFile(`./${name}/package.json`, updatePackageJson, 'utf8', function (err) {
        spinner.stop();
        if (err) {
          console.error(' ' + err);
          return;
        } else {
          console.log(chalk.green('项目初始化成功!'))
          console.log(`
            ${chalk.bgWhite.black('   Run Application  ')}
            ${chalk.yellow(`cd ${name}`)}
            ${chalk.yellow('yarn install')}
            ${chalk.yellow('yarn start')}
          `);
        }
      });
    });
  })
})
