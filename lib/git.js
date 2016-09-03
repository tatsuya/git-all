var fs = require('fs');
var path = require('path');
var async = require('async');
var debug = require('debug')('git-all:git');

var file = require('./file');
var exec = require('child_process').exec;

module.exports = function(command, parent, callback) {
  // Retrieve files in a parent directory
  fs.readdir(parent, function(err, children) {
    if (err) {
      return callback(err);
    }

    // Concatenate file name and its absolute path
    var files = children.map(function(child) {
      return path.resolve(parent, child);
    });

    var executor = createExecutor('git ' + command);

    async.each(files, executor, callback);
  });
};

function createExecutor(command) {
  return function executor(dir, callback) {
    file.isGitRepository(dir, function(err, result) {
      if (err) {
        return callback(err);
      }
      if (!result) {
        return callback(null, {});
      }
      exec(command, { cwd: dir }, function(err, stdout, stderr) {
        if (err || stderr) {
          debug(stdout);
          debug(stderr);
          return callback(err);
        }
        console.log('\033[36m' + path.basename(dir) + '/\033[39m');
        if (stdout) {
          process.stdout.write(stdout);
        }
        callback(null);
      });
    });
  };
}