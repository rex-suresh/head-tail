const fs = require('fs');
const { main } = require('./src/tail/tailMain.js');

main(console.log, console.error, fs.readFileSync, process.argv.slice(2));
// console.log('usage: tail [-c # | -n #] [file ...]');
