const firstNParts = (content, limit, separator) => {
  const parts = content.split(separator);
  const fetchedParts = parts.slice(0, limit);
  return fetchedParts.join(separator);
};
const firstNLines = (content, limit) => firstNParts(content, limit, '\n');
const firstNBytes = (content, limit) => firstNParts(content, limit, '');

const head = function (fileContent, { filterOn, limit }) {
  const fetchFns = {
    lines: firstNLines,
    bytes: firstNBytes
  };

  const firstNItems = fetchFns[filterOn];
  return firstNItems(fileContent, limit);
};

exports.head = head;
exports.firstNParts = firstNParts;
