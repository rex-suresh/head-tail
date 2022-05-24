const separateOptVal = function (arg) {
  const [, option, value] = arg.match(/([-+][A-z]?)(.*)?$/);
  return [option, value];
};
const isOption = (arg) => /^-[A-z-0-9]*$/.test(arg);

const separateArgs = function (allArgs) {
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

const parseOption = function (arg) {
  if (!arg) {
    return { option: '-n', limit: 10, filterOn: 'lines' };
  }
  const filterList = { '-n': 'lines', '-c': 'bytes', '-': 'lines' };
  arg.limit = + arg.limit;
  arg.filterOn = filterList[arg.option];
  return arg;
};

const positionsOf = (value) => {
  const start = value[0] === '+' ? value : 0;
  const count = !start ? Math.abs(value) : 0;
  return [start, count];
};

const parseTailOption = function (arg) {
  if (!arg) {
    return { option: '-n', start: 0, count: 10, filterOn: 'lines' };
  }
  const filterList = { '-n': 'lines', '-c': 'bytes', '-': 'lines' };
  const [start, count] = positionsOf(arg.limit);
  const parsedArg = {
    filterOn: filterList[arg.option],
    start: +start, count, option: arg.option
  };

  return parsedArg;
};
exports.separateOptVal = separateOptVal;
exports.separateArgs = separateArgs;
exports.parseOption = parseOption;
exports.parseTailOption = parseTailOption;
