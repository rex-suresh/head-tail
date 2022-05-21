const assert = require('assert');
const { formatOutput } = require('../src/formatHeadOutput.js');

describe( 'formatOutput', () => {
  it( 'should return head output for 1 file', () => {
    assert.deepEqual(formatOutput(['hello'], ['a']), ['hello']);
    assert.deepEqual(formatOutput([''], ['a']), ['']);
  });

  it( 'should return formatted head output for 2 files', () => {
    assert.deepEqual(formatOutput(['hello', 'bye'], ['a', 'b']),
      ['==> a <==\nhello', '==> b <==\nbye']);
    assert.deepEqual(formatOutput(['h', 'b'], ['a', 'b']),
      ['==> a <==\nh', '==> b <==\nb']);
  });
});
