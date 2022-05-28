const { headFile } = require('./headLib.js');
const { separateArgs, parseOption } = require('./fetch.js');
const { usage, changeExitCode, validateSeparatedArgs } =
  require('./validate.js');

const main = (log, showError, readFile, rawArgs) => {
  if (rawArgs[0] === '--help') {
    log(usage());
    changeExitCode();
    return;
  }
  
  const args = separateArgs(rawArgs);
  validateSeparatedArgs(args, showError);
  
  if (process.exitCode !== 1) {
    const { options, files } = args;
    const option = parseOption(options[options.length - 1]);
    
    files.map(fileName => headFile(
      fileName, option, files.length, { readFile, log, showError })
    );
  }
};

exports.main = main;
