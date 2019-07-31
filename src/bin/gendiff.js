#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((configBefore, configAfter, options) => {
    const diff = genDiff(configBefore, configAfter, options.format);
    console.log(diff);
  })
  .parse(process.argv);
