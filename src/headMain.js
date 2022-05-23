/* eslint-disable no-process-exit */

const { head } = require('./headLib.js');
const { checkArgs } = require('./validate.js');
const { formatOutput, formatErrorMessage } = require('./formatOutput.js');
const { separateArgs, parseOption } = require('./fetch.js');

const isHelp = (log, arg) => {
  if (arg === '--help') {
    log('usage: head [-n lines | -c bytes] [file ...]');
    process.exit(1);
  }
};

const main = function (log, showError, readFile, args) {
  isHelp(log, args[0]);
  
  const parsedArgs = separateArgs(args);
  try {
    checkArgs(parsedArgs);
  } catch (error) {
    showError('head:', error.message);
    process.exit(1);
  }
  
  const { options, files } = parsedArgs;
  const finalOption = parseOption(options[ options.length - 1]);
  
  files.forEach((file, index) => {
    try {
      const headOutput = head(readFile(file, 'utf8'), finalOption);
      log(formatOutput(headOutput, file, files.length, index));
    } catch (error) {
      const message = formatErrorMessage(error.message, file);
      showError(message);
      process.exitCode = 1;
    }
  });
};

exports.main = main;
