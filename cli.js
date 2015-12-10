#!/usr/bin/env node

var git = require('./lib/git');

var path = require('path');

var argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log('Usage: git-all <command> [<parent-dir>]');
  process.exit(0);
}

var command = argv.shift();
var parent = argv.shift() || '.';

git(command, path.resolve(process.cwd(), parent), function(err) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log('Done!');
});
