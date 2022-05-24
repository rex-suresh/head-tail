/* eslint-disable max-statements */
/* eslint-disable no-process-exit */

const { head } = require('./headLib.js');
const { checkArgs } = require('./validate.js');
const { formatOutput, formatErrorMessage } = require('./formatOutput.js');
const { separateArgs, parseOption } = require('./fetch.js');

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
  const finalOption = parseOption(options[ options.length - 1]);
  let logCount = 0;
  files.forEach((file) => {
    try {
      const headOutput = head(readFile(file, 'utf8'), finalOption);
      log(formatOutput(headOutput, file, files.length, logCount));
      logCount++;
    } catch (error) {
      const message = formatErrorMessage(error.message, file);
      showError(message);
      process.exitCode = 1;
    }
  });
};

exports.main = main;
