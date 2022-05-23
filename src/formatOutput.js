const formatName = fileName => `==> ${fileName} <==`;
exports.formatOutput = (headOutput, fileName, fileCount) => {
  const formattedOutPut = formatName(fileName).concat('\n', headOutput);
  return fileCount > 1 ? formattedOutPut : headOutput;
};
