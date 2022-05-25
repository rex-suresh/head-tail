const formatName = fileName => `==> ${fileName} <==`;
const capitalize = (message) => message[0].toUpperCase() + message.slice(1);

const formatErrorMessage = (message, fileName, processName) => {
  const newMessage = message.slice(message.indexOf(':') + 2);
  return `${processName}: ${fileName}: ${capitalize(
    newMessage.slice(0, newMessage.lastIndexOf(',')))}`;
};

const formatOutput = (headOutput, fileName, fileCount, logCount, quietMode) => {
  const formattedOutPut = formatName(fileName).concat('\n', headOutput);
  const output = fileCount > 1 ? formattedOutPut : headOutput;
  const gap = logCount > 0 ? '\n' : '';
  if (quietMode) {
    return headOutput;
  }
  return gap + output;
};

exports.formatErrorMessage = formatErrorMessage;
exports.formatOutput = formatOutput;
