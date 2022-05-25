// eslint-disable-next-line max-params
const itemsOf = function (content, start, count, separator, reverse) {
  const items = content.split(separator);
  let fetchedItems = items.slice(start).slice(-count);
  if (reverse) {
    if (start !== 0) {
      fetchedItems = items.slice(0, start);
    }
    fetchedItems.reverse();
  }
  return fetchedItems.join(separator);
};

const linesOf = (content, start, count, reverse) => itemsOf(
  content, start, count, '\n', reverse);
const bytesOf = (content, start, count, reverse) => itemsOf(
  content, start, count, '', reverse);

const tailMain = (content, { start, count, filterOn }, reverse) => {
  const fetchFns = {
    'lines': linesOf,
    'bytes': bytesOf
  };
  const tailFn = fetchFns[filterOn];
  const startPos = !start ? start : start - 1;
  return tailFn(content, startPos, count, reverse);
};

exports.tail = tailMain;
exports.itemsOf = itemsOf;
