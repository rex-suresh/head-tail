const {validate} = require('../head/validate.js');

const usage = () => 'usage: tail [-r] [-q] [-c # | -n #] [file ...]';
const illegalOptionThrow = (option) => {
  throw {
    message: `illegal option -- ${option[1]
    }\n${usage()}`
  };
};

const tailUsageThrow = () => {
  throw {
    message: usage()
  };
};

const illegalOffsetThrow = (value) => {
  throw { message: `illegal offset -- ${value}` };
};

const noArgThrow = () => {
  throw {
    message: `option requires an argument -- ${option[1]}\n${usage()}`
  };
};

const validateTailValue = function (arg) {
  if (arg.limit === undefined) {
    noArgThrow();
  }
  if (!isFinite(arg.limit)) {
    illegalOffsetThrow(arg.limit);
  }
};

const validateOption = function (arg) {
  if (!/^-[cn]?/.test(arg.option)) {
    illegalOptionThrow(arg.option);
  }
  validateTailValue(arg);
};

const validateTailOptions = function (options) {
  options.forEach(file => {
    validateOption(file);
  });
};

const validateTailArgs = function (args) {
  validate(args, validateTailOptions, tailUsageThrow);  
};

exports.validateTailArgs = validateTailArgs;
