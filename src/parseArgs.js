const { fetchInputs } = require('./fetchArgs.js');
const isOption = (arg) => /^-[cn]/.test(arg);

const parseOption = function (key, value) {
  const options = {
    '-c': { separator: '' },
    '-n': { separator: '\n'}
  };
  
  options[key].itemCount = + value;
  return options[key];  
};

const parseArgs = (args) => {
  const { option, files } = fetchInputs(args);
  const parsedOption = parseOption(...option);
  return { option: parsedOption, files };
};
exports.parseArgs = parseArgs;
exports.isOption = isOption;
exports.parseOption = parseOption;
