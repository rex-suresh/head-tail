const itemsOf = function (content, start, count, separator) {
  const items = content.split(separator);
  const fetchedItems = items.slice(start).slice(-count);
  return fetchedItems.join(separator);
};

const linesOf = (content, start, count) => itemsOf(content, start, count, '\n');
const bytesOf = (content, start, count) => itemsOf(content, start, count, '');

const tailMain = (content, { start, count, filterOn }) => {
  const fetchFns = {
    'lines': linesOf,
    'bytes': bytesOf
  };
  const tailFn = fetchFns[filterOn];
  const startPos = !start ? start : start - 1;
  return tailFn(content, startPos, count);
};

exports.tail = tailMain;
exports.itemsOf = itemsOf;
