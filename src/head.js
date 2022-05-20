const seperateLines = (content) => content.split('\n');
const joinLines = (lines) => lines.join('\n');

const head = function (content) {
  const lines = seperateLines(content);
  return joinLines(lines);
};  
exports.head = head;
