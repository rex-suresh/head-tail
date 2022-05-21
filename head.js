/* eslint-disable max-statements */
const fs = require('fs');
const { headMain } = require('./src/headMain.js');
const { parseArgs } = require('./src/parseArgs.js');
const { formatOutput } = require('./src/formatHeadOutput.js');
const { joinComponents } = require('./src/stringManipulate.js');
const { exit } = require('process');

const main = function (readFile, args) {
  let parsedArgs;
  try {
    parsedArgs = parseArgs(args);
  } catch (error) {
    console.error(error.message);
    exit(2);
  }
  const head = headMain.bind(null, readFile, parsedArgs.option);
  const headOutput = [];
  
  for (let index = 0; index < parsedArgs.files.length; index++) {
    try {
      headOutput.push(head(parsedArgs.files[index]));
    } catch (error) {
      headOutput.push(error.message);
    }
  }
  return joinComponents(formatOutput(headOutput, parsedArgs.files), '\n\n');
};

console.log(main(fs.readFileSync, process.argv.slice(2)));
