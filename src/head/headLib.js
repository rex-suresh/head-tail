const { formatHeadError, printOutput, formatName } =
  require('../formatOutput.js');

const firstNParts = (content, limit, separator) => {
  const parts = content.split(separator);
  const fetchedParts = parts.slice(0, limit);
  return fetchedParts.join(separator);
};
const firstNLines = (content, limit) => firstNParts(content, limit, '\n');
const firstNBytes = (content, limit) => firstNParts(content, limit, '');

const head = (fileContent, { filterOn, limit }) => {
  const fetchFns = {
    lines: firstNLines,
    bytes: firstNBytes
  };

  const firstNItems = fetchFns[filterOn];
  return firstNItems(fileContent, limit);
};

const readFileContent = (fileName, readFile) => {
  const encoding = 'utf8';
  try {
    const content = readFile(fileName, encoding);
    return {content, fileName};
  } catch (fileError) {
    const error = formatHeadError(fileError.message, fileName);
    return {error, fileName};
  }
};

const captureHead = (fileContent, option) => {
  if (fileContent.error) {
    return fileContent;
  }
  fileContent.header = formatName(fileContent.fileName);
  fileContent.headOutput = head(fileContent.content, option);
  return fileContent;
};

const headFile = (fileName, option, fileCount, {readFile, log, showError}) => {
  const fileContent = readFileContent(fileName, readFile);
  const headOutput = captureHead(fileContent, option);
  printOutput(headOutput, { log, showError }, fileCount);
};

exports.head = head;
exports.headFile = headFile;
exports.firstNParts = firstNParts;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.captureHead = captureHead;
exports.readFileContent = readFileContent;
