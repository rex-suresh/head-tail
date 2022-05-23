const formatName = fileName => `==> ${fileName} <==`;
const capitalize = (message) => message[0].toUpperCase() + message.slice(1);
const formatErrorMessage = (message, fileName) => {
  const newMessage = message.slice(message.indexOf(':') + 2);
  return `head: ${fileName}: ${capitalize(
    newMessage.slice(0, newMessage.lastIndexOf(',')))}`;
};

exports.formatOutput = (headOutput, fileName, fileCount, currentCount) => {
  const formattedOutPut = formatName(fileName).concat('\n', headOutput);
  const output = fileCount > 1 ? formattedOutPut : headOutput;
  const gap = currentCount < fileCount - 1 ? '\n' : '';
  return output + gap;
};
exports.formatErrorMessage = formatErrorMessage;
