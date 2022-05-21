const fs = require('fs');
const { headMain } = require('./src/headMain.js');
const { parseArgs } = require('./src/parseArgs.js');

const parsedArgs = parseArgs(process.argv.slice(2));
const head = headMain.bind(null, fs.readFileSync, parsedArgs.option);

parsedArgs.files.map(file => console.log(head(file)));
