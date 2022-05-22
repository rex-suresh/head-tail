/* eslint-disable max-statements */
const separateArgs = (args) => {
  const userArgs = args.splice(0);
  const optionPattern = /^-/;
  const options = [];
  
  while (optionPattern.test(userArgs[0])) {
    const option = userArgs.shift();
    const key = option.match(/^-[A-z]/g)[0];
    let value = option.match(/-[0-9]{1,}/g);
    
    if (!isFinite(value) || value === null) {
      value = userArgs.shift();
    }
    options.push([key, value]);
  }
  return {options, files: userArgs};
};

const illegalOptionThrow = (option) => {
  throw {
    message:
      `illegal option --${option}`
  };
};

const illegalCountThrow = (option) => {
  throw { message: 'illegal line count --' + option[1] };
};

const usageThrow = () => {
  throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
};

const combinedOptionThrow = () => {
  throw {
    message: 'can\'t combine line and byte counts'
  };
};

const fetchOptions = function (options) {
  let selectedOption = ['-n', 10];

  while (options.length > 0) {
    selectedOption = options[options.length - 1];
    const firstOption = options.shift();
    if (selectedOption[0] !== firstOption[0]) {
      const isMatch = /^-[cn]/.test(selectedOption[0]);
      if (isMatch) {
        combinedOptionThrow();
      }
      illegalOptionThrow(selectedOption);
    }
  }

  return selectedOption;
};

const fetchInputs = function (args) {
  const { options, files } = separateArgs(args);
  const option = fetchOptions(options);
  const optionValid = ([key, value]) => value > 0 && isFinite(value);
  if (files.length < 1) {
    usageThrow();
  }
  if (!optionValid(option)) {
    illegalCountThrow(option);
  }
  return { option, files };
};
exports.fetchInputs = fetchInputs;