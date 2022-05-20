const separateLines = (content, separator) => content.split(separator);
const joinLines = (lines, separator) => lines.join(separator);

const firstNLines = (lines, lineCount) => lines.slice(0, lineCount);

const head = function (content, lineCount, separator) {
  const lines = separateLines(content, separator);
  return joinLines(firstNLines(lines, lineCount), separator);
};

exports.head = head;
exports.firstNLines = firstNLines;
