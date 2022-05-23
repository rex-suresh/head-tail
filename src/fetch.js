const separateOptVal = function (arg) {
  const [, option, value] = arg.match(/(-[A-z]?)(-?[0-9]+)?/);
  return [option, +value];
};

const separateArgs = function (allArgs) {
  const args = [...allArgs];
  const options = [];
  
  while (args.length > 0 && args[0].startsWith('-')) {
    const arg = args.shift();
    const [option, value] = separateOptVal(arg);
    const limit = isFinite(value) ? value : + args.shift();
    options.push({option, limit});
  }
  return { options, files: args };
};

const parseOption = function (arg) {
  if (!arg) {
    return { option: '-n', limit: 10, filterOn: 'lines' };
  }
  const filterList = {'-n': 'lines', '-c': 'bytes', '-': 'lines'};
  arg.filterOn = filterList[arg.option];
  return arg;
};
exports.separateOptVal = separateOptVal;
exports.separateArgs = separateArgs;
exports.parseOption = parseOption;
