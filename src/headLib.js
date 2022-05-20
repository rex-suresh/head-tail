const separateComponents = (content, separator) => content.split(separator);
const joinComponents = (lines, separator) => lines.join(separator);

const firstNItems = (lines, lineCount) => lines.slice(0, lineCount);

const head = function (content, lineCount, separator) {
  const lines = separateComponents(content, separator);
  return joinComponents(firstNItems(lines, lineCount), separator);
};

exports.head = head;
exports.firstNItems = firstNItems;
