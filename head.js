const fs = require('fs');
const { headMain } = require('./src/headMain.js');
const { parseArgs } = require('./src/parseArgs.js');
const { formatOutput } = require('./src/formatHeadOutput.js');
const { joinComponents } = require('./src/stringManipulate.js');

const main = function (readFile, args) {
  const parsedArgs = parseArgs(args);
  const head = headMain.bind(null, readFile, parsedArgs.option);
  const headOutput = parsedArgs.files.map(head);
  return joinComponents(formatOutput(headOutput, parsedArgs.files), '\n\n');
};

console.log(main(fs.readFileSync, process.argv.slice(2)));
