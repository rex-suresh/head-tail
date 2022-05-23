const fs = require('fs');
const {main} = require('./src/headMain.js');

main(console.log, console.error, fs.readFileSync, process.argv.slice(2));
