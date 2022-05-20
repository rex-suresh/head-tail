const { separateComponents, joinComponents, firstNItems } =
  require('./stringManipulate.js');

const head = function (content, {itemCount, separator}) {
  const lines = separateComponents(content, separator);
  return joinComponents(firstNItems(lines, itemCount), separator);
};

exports.head = head;
