const createResultObject = (fileContent, fileName, log) => {
  const outputObject = { fileContent, fileName };
  outputObject.printFn = function () {
    log(this.headOutput);
  };
  return outputObject;
};

const createErrorObject = (error, fileName, showError) => {
  const errorObject = { error, fileName };
  errorObject.printFn = showError.bind(null, errorObject.error);
  return errorObject;
};

const readFileContent = (fileName, readFile, {log, showError}) => {
  const encoding = 'utf8';
  try {
    const fileContent = readFile(fileName, encoding);
    return createResultObject(fileContent, fileName, log);
  } catch (fileError) {
    const error = fileError.message + fileName;
    return createErrorObject(error, fileName, showError);
  }
};

const head = (content) => content;

const headFile = (fileName, option, readFile, printFunctions) => {
  const fileObject = readFileContent(fileName, readFile, printFunctions);
  if (!fileObject.error) {
    fileObject.headOutput = head(fileObject.fileContent, option);
  }
  return fileObject;
};

headFile();
