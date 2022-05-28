const formatName = fileName => `==> ${fileName} <==`;
const capitalize = (message) => message[0].toUpperCase() + message.slice(1);

const formatHeadError = (message, fileName) => formatErrorMessage(
  message, fileName, 'head');
const formatTailError = (message, fileName) => formatErrorMessage(
  message, fileName, 'tail');

const formatErrorMessage = (message, fileName, processName) => {
  const newMessage = message.slice(message.indexOf(':') + 2);
  return `${processName}: ${fileName}: ${capitalize(
    newMessage.slice(0, newMessage.lastIndexOf(',')))}`;
};

const formatOutput = (
  headOutput, { fileName, fileCount, logStatus, quietMode}) => {
  const formattedOutPut = formatName(fileName).concat('\n', headOutput);
  const output = fileCount > 1 ? formattedOutPut : headOutput;
  const gap = logStatus ? '\n' : '';
  if (quietMode) {
    return headOutput;
  }
  return gap + output;
};

const printOutput = function (headContent, { log, showError }, fileCount) {
  const { error, headOutput, header } = headContent;  
  if (error) {
    showError(error);
    return;
  }
  
  const callStatus = log.callStatus;
  const output = formatHeadOutput({ fileCount, callStatus },
    { headOutput, header });
  
  log(output);
  log.callStatus = true;
};

function formatHeadOutput({fileCount, callStatus}, { headOutput, header }) {
  const gap = callStatus ? '\n' : '';
  const output = fileCount > 1 ?
    `${gap}${header}\n${headOutput}` : `${headOutput}`;
  return output;
}

exports.formatErrorMessage = formatErrorMessage;
exports.formatHeadError = formatHeadError;
exports.formatTailError = formatTailError;
exports.formatOutput = formatOutput;
exports.formatName = formatName;
exports.printOutput = printOutput;
