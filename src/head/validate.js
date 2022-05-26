const illegalOptionThrow = (option) => {
  throw {
    message: `illegal option -- ${option[1]
    }\nusage: head [-n lines | -c bytes] [file ...]`
  };
};

const optionReqArgThrow = (key) => {
  throw {
    message: `option requires an argument -- ${key[1]
    }\nusage: head [-n lines | -c bytes] [file ...]`
  };
};

const illegalValueThrow = (optionName, value) => {
  throw { message: `illegal ${optionName} count -- ${value}` };
};

const usageThrow = () => {
  throw {message: 'usage: head [-n lines | -c bytes] [file ...]'};
};

const combinedOptionThrow = () => {
  throw { message: 'can\'t combine line and byte counts' };
};

const validateValue = (arg) => {
  if (!isFinite(+arg.limit) || +arg.limit < 1) {
    const optionName = arg.option === '-c' ? 'bytes' : 'line';
    illegalValueThrow(optionName, arg.limit);
  }
};

const validateValueExist = (arg) => {
  if (!arg.limit) {
    optionReqArgThrow(arg.option);
  }
};

const validateOption = () => {
  const knownOptionsPattern = /^-[cn]?$/;
  const options = [];
  return (arg) => {
    if (!knownOptionsPattern.test(arg.option)) {
      illegalOptionThrow(arg.option);
    }
    if (!options.includes(arg.option) && options.length > 0) {
      combinedOptionThrow();
    }
    options.push(arg.option);
  };
};

const validateOptions = (options) => {
  options.forEach(validateOption());
  options.forEach((option) => {
    validateValueExist(option);
    validateValue(option);
  });
};

const validate = (args, validateOpts, usage) => {
  validateOpts(args.options);
  if (args.files.length < 1) {
    usage();
  }
};

const validateHeadArgs = (args) => {
  validate(args, validateOptions, usageThrow);  
};

exports.validate = validate;
exports.checkArgs = validateHeadArgs;
