const separateLines = (content) => content.split('\n');
const joinLines = (lines) => lines.join('\n');

const firstNLines = (lines, lineCount) => lines.slice(0, lineCount);

const head = function (content, lineCount) {
  const lines = separateLines(content);
  return joinLines(firstNLines(lines, lineCount));
};  
exports.head = head;
exports.firstNLines = firstNLines;
