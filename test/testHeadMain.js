const assert = require('assert');
const {main} = require('../src/headMain.js');

const mockReadFile = (content, expFileName, expEncoding) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.equal(fileName, expFileName[index]);
    assert.equal(encoding, expEncoding);
    index++;
    return content[index - 1];
  };
};

const mockConsole = (expText) => {
  let index = 0;
  return (...text) => {
    assert.deepEqual(text, expText[index]);
    index++;
  };
};

describe( 'main', () => {
  it( 'should return 1 line when called with args', () => {
    assert.equal(
      main(
        mockConsole([['hello']]),
        mockConsole([]),
        mockReadFile(['hello'], ['a.txt'], 'utf8'),
        ['-n', '1', 'a.txt']), undefined);
  });

  it( 'should return 2 lines when called with args', () => {
    assert.equal(
      main(
        mockConsole([['==> a.txt <==\nhello'], ['\n==> b.txt <==\nhey']]),
        mockConsole([]),
        mockReadFile(
          ['hello', 'hey'],
          ['a.txt', 'b.txt'], 'utf8'),
        ['-n', '1', 'a.txt', 'b.txt']), undefined);
  });

  it( 'should show error when called with bad file', () => {
    assert.equal(
      main(
        mockConsole([]),
        mockConsole([['head: abc: No such file or directory']]),
        () => {
          throw { message: 'ENOENT: no such file or directory, open \'abc\'' };
        },
        ['-n', '1', 'abc']), undefined);
  });
});
