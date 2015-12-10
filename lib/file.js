var fs = require('fs');
var path = require('path');

/**
 * Return true if the given file path is a directory.
 *
 * @param  {String}   file
 * @param  {Function} callback
 */
function isDirectory(file, callback) {
  fs.stat(file, function(err, stats) {
    if (err) {
      return callback(err);
    }
    return callback(null, stats.isDirectory());
  });
}

function isGitRepository(dir, callback) {
  isDirectory(path.resolve(dir, '.git'), function(err, result) {
    if (err) {
      if (err.code === 'ENOENT' || err.code === 'ENOTDIR') {
        // No such file or directory
        return callback(null, false);
      } else {
        // Some other error occured
        return callback(err);
      }
    }
    return callback(null, result);
  });
}

exports.isDirectory = isDirectory;
exports.isGitRepository = isGitRepository;
