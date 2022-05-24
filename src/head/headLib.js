const separateParts = (content, separator) => content.split(separator);
const joinParts = (parts, separator) => parts.join(separator);
const firstNParts = (content, limit, separator) => {
  const parts = separateParts(content, separator);
  return joinParts(parts.slice(0, limit), separator);
};
const firstNLines = (content, limit) => firstNParts(content, limit, '\n');
const firstNBytes = (content, limit) => firstNParts(content, limit, '');

const headMain = function (fileContent, { filterOn, limit }) {
  const fetchFns = {
    'lines': firstNLines,
    'bytes': firstNBytes
  };

  const firstNItems = fetchFns[filterOn];
  return firstNItems(fileContent, limit);
};
exports.head = headMain;
exports.separateParts = separateParts;
exports.firstNParts = firstNParts;
