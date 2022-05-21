const { head } = require('./headLib.js');

const headMain = function (readFile, options, file) {
  return head(readFile(file, 'utf8'), options);
};

exports.headMain = headMain;
