const assert = require('assert');
const { formatOutput } = require('../src/formatOutput.js');

describe( 'formatOutput', () => {
  it( 'should return output for 1 file', () => {
    assert.deepEqual(formatOutput('hello', 'a.txt', 1), 'hello');
  });

  it( 'should return formatted output for 2 fileCount', () => {
    assert.deepEqual(formatOutput('hello', 'a.txt', 2),
      '==> a.txt <==\nhello');
  });
});
