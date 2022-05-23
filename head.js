/* eslint-disable no-process-exit */

const fs = require('fs');
const { head } = require('./src/headLib.js');
const { checkArgs } = require('./src/validate.js');
const { formatOutput, formatErrorMessage } = require('./src/formatOutput.js');
const { separateArgs, parseOption } = require('./src/fetch.js');

const main = function (readFile, args) {
  const parsedArgs = separateArgs(args);
  try {
    checkArgs(parsedArgs);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  
  const { options, files } = parsedArgs;
  const finalOption = parseOption(options[ options.length - 1]);
  
  files.forEach((file, index) => {
    try {
      const headOutput = head(readFile(file, 'utf8'), finalOption);
      console.log(formatOutput(headOutput, file, files.length, index));
    } catch (error) {
      const message = formatErrorMessage(error.message, file);
      console.error(message);
      process.exitCode = 1;
    }
  });
};

main(fs.readFileSync, process.argv.slice(2));
