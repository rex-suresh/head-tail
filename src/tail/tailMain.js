const { tail } = require('./tailLib.js');
const { formatOutput, formatErrorMessage } = require('../formatOutput.js');
const { fetchArgs, parseTailOption } = require('./fetch.js');

const tailFile = function (
  {finalOption, fileCount, switches}, { readFile, log, showError }) {
  let logStatus = false;
  
  return (fileName) => {
    try {
      const tailOutput = tail(
        readFile(fileName, 'utf8'), finalOption, switches.quiet);
      log(formatOutput(tailOutput, { fileName, fileCount, logStatus }));
      logStatus = true;
    } catch (error) {
      const message = formatErrorMessage(error.message, fileName, 'tail');
      showError(message);
      process.exitCode = 1;
    }
  };
};

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
  
  files.forEach(tailFile(
    { finalOption, fileCount: files.length, switches },
    { readFile, log, showError }));
};

exports.main = main;
