/* eslint-disable max-statements */
/* eslint-disable complexity */

const { validateSwitch, validateValue, validateSwitchStatus, usage } = require(
  './tailValidateFns.js');

const isNumOption = (arg) => {
  return /^[+-]$/.test(arg);
};

const isOption = (arg) => {
  return arg.startsWith('-') || arg.startsWith('+');
};

const separateParts = (arg) => {
  const [, key, value] = arg.match(/([+-][A-z]?)(.*)?/);
  return value !== undefined ? [key, value] : [key];
};

const separateArgs = (args) => {
  return args.flatMap((arg) => isOption(arg) ? separateParts(arg) : arg);
};

const isStandAlone = (key, keys) => {
  return keys.standAlone.includes(key);
};

const changeSwitch = (key, switches) => {
  const options = {
    '-r': 'reverse',
    '-q': 'quiet'
  };
  validateSwitchStatus(key, switches, options);
  switches[options[key]] = true;
};

const parseNumArg = (key, value) => {
  return {
    option: key,
    limit: key === '+' ? '+' + value : value,
    filterOn: 'lines'
  };
};

const parseKeyArg = (key, value) => {
  const filters = { '-n': 'lines', '-c': 'bytes'};
  return {option: key, limit: value, filterOn: filters[key]};
};

const parseOption = (args) => {
  const key = args.shift();
  const limit = args.shift();
  validateValue(limit, key);
  
  const option = isNumOption(key) ? parseNumArg : parseKeyArg;
  
  const value = limit.startsWith('+') ? limit : Math.abs(limit) + '';
  return option(key, value);
};

const fetchArgs = (args) => {
  if (args.length < 1) {
    throw { message: usage() };
  }
  
  const masterOption = {
    keys: {
      standAlone: ['-r', '-q'],
      valued: ['-n', '-c']
    },
    switches: {
      reverse: false,
      quiet: false,
    },
    files: [],
    options: []
  };

  const separatedArgs = separateArgs(args);
  
  let currentArg = separatedArgs[0]; 
  while (isOption(currentArg) || isNumOption(currentArg)) {
    validateSwitch(currentArg);
    if (isStandAlone(currentArg, masterOption.keys)) {
      changeSwitch(separatedArgs.shift(), masterOption.switches);
    } else {
      masterOption.options.push(parseOption(separatedArgs));
    }
    currentArg = separatedArgs[0]; 
  }
  
  masterOption.files.push(...separatedArgs);
  
  if (masterOption.options.length > 1) {
    throw { message: usage() };
  }
  return masterOption;
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
  const filterList = {
    '-n': 'lines',
    '-c': 'bytes',
    '-': 'lines',
    '+': 'lines'
  };
  const [start, count] = positionsOf(arg.limit);
  const parsedArg = {
    filterOn: filterList[arg.option],
    start: +start, count, option: arg.option
  };

  return parsedArg;
};

exports.fetchArgs = fetchArgs;
exports.parseTailOption = parseTailOption;
