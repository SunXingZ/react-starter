// const chalk = require('chalk');
// const figlet = require('figlet');
// const clear = require('clear');
// const files = require('./lib/files');
// const inquirer = require('./lib/inquirer');

// clear();
// console.log(chalk.yellow(figlet.textSync('react-start', {
//   horizontalLayout: 'full'
// })));

// const run = async () => {
//   const project = await inquirer.askForProjectType();
//   console.log(project); //{ type: '管理系统' }
// }

// run();

const shell = require('shelljs');

function runApp(app) {
  shell.exec('open -a /Applications/'+ app +'.app');
}

runApp('DingTalk');