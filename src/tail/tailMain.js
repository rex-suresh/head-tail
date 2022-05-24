/* eslint-disable max-statements */
/* eslint-disable no-process-exit */

const { tail } = require('./tailLib.js');
const { validateTailArgs } = require('./tailValidateFns.js');
const { formatOutput, formatErrorMessage } = require('../formatOutput.js');
const { separateArgs, parseTailOption } = require('../head/fetch.js');

const main = function (log, showError, readFile, args) {
  if (args[0] === '--help') {
    log('usage: tail [-r] [-q] [-c # | -n #] [file ...]');
    process.exitCode = 1;
    return;
  }
  const parsedArgs = separateArgs(args);
  try {
    validateTailArgs(parsedArgs);
  } catch (error) {
    showError('tail:', error.message);
    process.exitCode = 1;
    return;
  }
  const { options, files } = parsedArgs;
  const finalOption = parseTailOption(options[ options.length - 1]);
  
  let logCount = 0;
  files.forEach((file) => {
    try {
      const tailOutput = tail(readFile(file, 'utf8'), finalOption);
      log(formatOutput(tailOutput, file, files.length, logCount));
      logCount++;
    } catch (error) {
      const message = formatErrorMessage(error.message, file, 'tail');
      showError(message);
      process.exitCode = 1;
    }
  });
};

exports.main = main;
