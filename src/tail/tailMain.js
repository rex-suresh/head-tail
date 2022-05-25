/* eslint-disable max-statements */
/* eslint-disable no-process-exit */

const { tail } = require('./tailLib.js');
const { formatOutput, formatErrorMessage } = require('../formatOutput.js');
const { fetchArgs, parseTailOption } = require('./fetch.js');

const main = function (log, showError, readFile, args) {
  if (args[0] === '--help') {
    log('usage: tail [-r] [-q] [-c # | -n #] [file ...]');
    process.exitCode = 1;
    return;
  }

  let parsedArgs;
  try {
    parsedArgs = fetchArgs(args);
  } catch (error) {
    showError('tail:', error.message);
    process.exitCode = 1;
    return;
  }

  const { options, files, switches } = parsedArgs;
  const finalOption = parseTailOption(options.pop());
  
  let logCount = 0;
  files.forEach((file) => {
    try {
      const tailOutput = tail(
        readFile(file, 'utf8'), finalOption, switches.reverse);
      log(formatOutput(
        tailOutput, file, files.length, logCount, switches.quiet));
      logCount++;
    } catch (error) {
      const message = formatErrorMessage(error.message, file, 'tail');
      showError(message);
      process.exitCode = 1;
    }
  });
};

exports.main = main;
