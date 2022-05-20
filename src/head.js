const separateLines = (content) => content.split('\n');
const joinLines = (lines) => lines.join('\n');

const firstNLines = (lines, lineCount) => lines.slice(0, lineCount);

const head = function (content) {
  const lines = separateLines(content);
  return joinLines(lines);
};  
exports.head = head;
exports.firstNLines = firstNLines;
