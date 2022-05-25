const assert = require('assert');
const {main} = require('../../src/tail/tailMain.js');

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
    main(
      mockConsole([['hello']]),
      mockConsole([]),
      mockReadFile(['hello'], ['a.txt'], 'utf8'),
      ['-n', '1', 'a.txt']);
  });

  it( 'should return 2 lines when called with args', () => {
    main(
      mockConsole([['==> a.txt <==\nhello'], ['\n==> b.txt <==\nhey']]),
      mockConsole([]),
      mockReadFile(
        ['hello', 'hey'],
        ['a.txt', 'b.txt'], 'utf8'),
      ['-n', '1', 'a.txt', 'b.txt']);
  });

  it( 'should show error when called with no file exist', () => {
    main(
      mockConsole([]),
      mockConsole([['tail: abc: No such file or directory']]),
      () => {
        throw { message: 'ENOENT: no such file or directory, open \'abc\'' };
      },
      ['-n', '1', 'abc']);
  });

  it( 'should show error when file not readable', () => {
    main(
      mockConsole([]),
      mockConsole([['tail: abc: Permission denied']]),
      () => {
        throw { message: 'ENOENT: permission denied, open \'abc\'' };
      },
      ['-n', '1', 'abc']);
  });

  it( 'should show error arg not provided', () => {

    main(
      mockConsole([]),
      mockConsole([['tail:', 'option requires an argument -- n\n' +
        'usage: tail [-r] [-q] [-c # | -n #] [file ...]']]),
      () => {},
      ['-n']);
  });

  it( 'should show usage arg is --help', () => {

    main(
      mockConsole([['usage: tail [-r] [-q] [-c # | -n #] [file ...]']]),
      mockConsole([]),
      () => {},
      ['--help']);
  });

  it( 'should show error illegal offset', () => {

    main(
      mockConsole([]),
      mockConsole([['tail:', 'illegal offset -- a']]),
      () => {},
      ['-na']);
  });
  it( 'should show error illegal option', () => {

    main(
      mockConsole([]),
      mockConsole([['tail:',
        'illegal option -- x\nusage: tail [-r] [-q] [-c # | -n #] [file ...]'
      ]]),
      () => {},
      ['-xa']);
  });
});
