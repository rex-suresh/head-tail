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

const noArgThrow = (key) => {
  throw {
    message: `option requires an argument -- ${key[1]}\n${usage()}`
  };
};

const validateValue = function (value, key) {
  if (value === undefined) {
    noArgThrow(key);
  }
  if (!isFinite(value)) {
    illegalOffsetThrow(value);
  }
};

const validateSwitch = function (key) {
  const switches = ['-c', '-n', '-r', '-q', '+', '-'];
  if (!switches.includes(key)) {
    illegalOptionThrow(key);
  }
};

const validateSwitchStatus = function (key, switches, options) {
  if (switches[options[key]]) {
    tailUsageThrow();
  }
};

exports.usage = usage;
exports.validateSwitch = validateSwitch;
exports.validateSwitchStatus = validateSwitchStatus;
exports.validateValue = validateValue;
