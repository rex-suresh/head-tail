const { head } = require('./headLib.js');
const { checkArgs } = require('./validate.js');
const { separateArgs, parseOption } = require('./fetch.js');
const { formatOutput, formatErrorMessage } = require('../formatOutput.js');

const headFile = function (
  {finalOption, fileCount}, { readFile, log, showError }) {
  let logStatus = false;
  
  return (fileName) => {
    try {
      const headOutput = head(readFile(fileName, 'utf8'), finalOption);
      log(formatOutput(headOutput, { fileName, fileCount, logStatus }));
      logStatus = true;
    } catch (error) {
      const message = formatErrorMessage(error.message, fileName, 'head');
      showError(message);
      process.exitCode = 1;
    }
  };
};

const main = function (log, showError, readFile, args) {
  if (args[0] === '--help') {
    log('usage: head [-n lines | -c bytes] [file ...]');
    process.exitCode = 1;
    return;
  }

  const parsedArgs = separateArgs(args);
  try {
    checkArgs(parsedArgs);
  } catch (error) {
    showError('head:', error.message);
    process.exitCode = 1;
    return;
  }
  const { options, files } = parsedArgs;
  const finalOption = parseOption(options[options.length - 1]);
  files.forEach(headFile(
    { finalOption, fileCount: files.length }, { readFile, log, showError }));
};

exports.main = main;
