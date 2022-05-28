const separateOptVal = (arg) => {
  const optionValuePattern = /(-[A-z]?)(.*)?$/;
  const [, option, value] = arg.match(optionValuePattern);
  return [option, value];
};
const isOption = (arg) => arg.startsWith('-');

const separateArgs = (allArgs) => {
  const args = [...allArgs];
  const options = [];
  
  while (args.length > 0 && isOption(args[0])) {
    const arg = args.shift();
    const [option, value] = separateOptVal(arg);
    const limit = value ? value : args.shift();
    options.push({option, limit});
  }
  return { options, files: args };
};

const parseOption = (arg) => {
  if (!arg) {
    return { option: '-n', limit: 10, filterOn: 'lines' };
  }
  const filterList = { '-n': 'lines', '-c': 'bytes', '-': 'lines' };
  arg.limit = + arg.limit;
  arg.filterOn = filterList[arg.option];
  return arg;
};

exports.separateOptVal = separateOptVal;
exports.separateArgs = separateArgs;
exports.parseOption = parseOption;
exports.isOption = isOption;
