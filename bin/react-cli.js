#!/usr/bin/env node
process.env.NODE_PATH = __dirname + '/../node_modules/'
const { resolve } = require('path')
const res = command => resolve(__dirname, '../commands/', command)
const program = require('commander')

program.version(require('../package').version)

program.usage('<command>')

program.command('init')
  .option('-f, --foo', 'enable some foo')
  .description('Generate a new react project')
  .alias('i')
  .action(() => {
    require(res('init'))
  })

program.command('new')
  .option('-f, --foo', 'enable some foo')
  .description('Generate a new react page')
  .alias('n')
  .action(() => {
    require(res('newReactPage'))
  })

program.parse(process.argv);

if (!program.args.length) {
  program.help()
}