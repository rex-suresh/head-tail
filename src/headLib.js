const separateComponents = (content, separator) => content.split(separator);
const joinComponents = (lines, separator) => lines.join(separator);

const firstNItems = (lines, itemCount) => lines.slice(0, itemCount);

const head = function (content, {itemCount, separator}) {
  const lines = separateComponents(content, separator);
  return joinComponents(firstNItems(lines, itemCount), separator);
};

exports.head = head;
exports.firstNItems = firstNItems;
