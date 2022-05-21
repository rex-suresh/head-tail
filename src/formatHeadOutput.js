const pushOutput = (output, headOutput) => output.push(headOutput);
const formatName = fileName => `==> ${fileName} <==`;
const pushBoth = (output, headOutput, fileName) =>
  output.push(formatName(fileName).concat('\n', headOutput));

const formatOutput = function (headOutput, fileNames) {
  const formattedOutPut = [];
  const format = headOutput.length > 1 ? pushBoth : pushOutput;
  for (let index = 0; index < headOutput.length; index++) {
    format(formattedOutPut, headOutput[index], fileNames[index]);
  }

  return formattedOutPut;
};

exports.formatOutput = formatOutput;
