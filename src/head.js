const seperateLines = (content) => content.split('\n');

const head = function (content) {
  const lines = seperateLines(content);
  return lines.join('\n');
};  
exports.head = head;
