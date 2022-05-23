const formatName = fileName => `==> ${fileName} <==`;
const capitalize = (message) => message[0].toUpperCase() + message.slice(1);

const formatErrorMessage = (message, fileName) => {
  const newMessage = message.slice(message.indexOf(':') + 2);
  return `head: ${fileName}: ${capitalize(
    newMessage.slice(0, newMessage.lastIndexOf(',')))}`;
};

const formatOutput = (headOutput, fileName, fileCount, currentCount) => {
  const formattedOutPut = formatName(fileName).concat('\n', headOutput);
  const output = fileCount > 1 ? formattedOutPut : headOutput;
  const gap = currentCount > 0 ? '\n' : '';
  return gap + output;
};
exports.formatErrorMessage = formatErrorMessage;
exports.formatOutput = formatOutput;
