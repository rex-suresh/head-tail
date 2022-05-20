const isOption = (arg) => /^-[cn]/.test(arg);

const parseOption = function (key, value) {
  const options = {
    '-c': { separator: '' },
    '-n': { separator: '\n'}
  };
  
  try {
    options[key].itemCount = + value;
    return options[key];  
  } catch (error) {
    throw {
      message: 'invalid option: ' + key,
      name: 'Parsing Error'
    };
  }
};

const isMultiOptioned = (options) =>
  options.includes('-c') && options.includes('-n');

const parseArgs = (args) => {
  const userArgs = args.slice(0);
  const parsedArgs = {
    files: [],
    option: parseOption('-n', 10),
  };
  
  while (userArgs.length > 0) {
    const item = userArgs.shift();
    if (isOption(item)) {
      parsedArgs.option = parseOption(item, userArgs.shift());
    } else {
      parsedArgs.files.push(item);
    }
  }

  if (isMultiOptioned(args)) {
    throw {
      name: 'Parsing Error',
      message: 'cannot combine line and byte counts'
    };
  }
  return { option: parsedArgs.option, files: parsedArgs.files };
};
exports.parseArgs = parseArgs;
exports.isOption = isOption;
exports.parseOption = parseOption;
