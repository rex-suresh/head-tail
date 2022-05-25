const assert = require('assert');
const { formatOutput } = require('../src/formatOutput.js');

describe( 'formatOutput', () => {
  it( 'should return output for 1 file', () => {
    assert.deepEqual(formatOutput('hello',
      { fileName: 'a.txt', fileCount: 1, logStatus: false }), 'hello');
  });

  it( 'should return formatted output for 2 fileCount', () => {
    assert.deepEqual(formatOutput('hello',
      { fileName: 'a.txt', fileCount: 2, logStatus: false }),
    '==> a.txt <==\nhello');
  });

  it( 'should return head output for 2 fileCount', () => {
    assert.deepEqual(formatOutput('hello',
      { fileName: 'a.txt', fileCount: 2, logStatus: true, quietMode: true}),
    'hello');
  });
});
