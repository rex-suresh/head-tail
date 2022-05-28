const assert = require('assert');
const {main} = require('../../src/head/headMain.js');

const mockReadFile = (content, expFileName, expEncoding) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.equal(fileName, expFileName[index]);
    assert.equal(encoding, expEncoding);
    index++;
    return content[index - 1];
  };
};

const mockConsole = (expArgs) => {
  let index = 0;
  return (...args) => {
    assert.deepStrictEqual(args, expArgs[index]);
    index++;
  };
};

// const mockConsole = (expArgs) => {
//   let index = 0;
//   const mockFn = function (...args) {
//     assert.deepStrictEqual(args, expArgs[index]);
//     index++;
//     mockFn.callCount = index;
//   };
//   return mockFn;
// };

describe( 'main', () => {
  it('should print 1 line when called with args', () => {
    const log = mockConsole([['hello']]);
    const showError = mockConsole([]);
    const readFile = mockReadFile(['hello'], ['a.txt'], 'utf8');
    
    assert.doesNotThrow(() =>
      main(log, showError, readFile, ['-n', '1', 'a.txt']));
    // assert.equal(log.callCount, 1);
  });

  it( 'should print 2 lines when called with args', () => {
    const log = mockConsole(
      [['==> a.txt <==\nhello'], ['\n==> b.txt <==\nhey']]); 
    const showError = mockConsole([]);
    const readFile = mockReadFile(
      ['hello', 'hey'], ['a.txt', 'b.txt'], 'utf8');
    
    assert.doesNotThrow(() =>
      main(log, showError, readFile, ['-n', '1', 'a.txt', 'b.txt']));
      
    // assert.equal(log.callCount, 2);
  });

  it( 'should show error when called with no file exist', () => {
    const log = mockConsole([]); 
    const showError = mockConsole([['head: abc: No such file or directory']]);
    const readFile = () => {
      throw { message: 'ENOENT: no such file or directory, open \'abc\'' };
    };
    assert.doesNotThrow(() =>
      main(log, showError, readFile, ['-n', '1', 'abc']));
  });

  it( 'should show error when file not readable', () => {
    const log = mockConsole([]); 
    const showError = mockConsole([['head: abc: Permission denied']]);
    const readFile = () => {
      throw { message: 'ENOENT: permission denied, open \'abc\'' };
    };
    assert.doesNotThrow(() =>
      main(log, showError, readFile, ['-n', '1', 'abc']));
  });

  it( 'should show error arg not provided', () => {
    const log = mockConsole([]); 
    const showError = mockConsole([
      ['head:', 'option requires an argument -- n\n' +
    'usage: head [-n lines | -c bytes] [file ...]']]);
    const readFile = () => {
      throw { message: 'ENOENT: permission denied, open \'abc\'' };
    };
    assert.doesNotThrow(() =>
      main(log, showError, readFile, ['-n']));
  });

  it( 'should show usage arg is --help', () => {
    const log = mockConsole([['usage: head [-n lines | -c bytes] [file ...]']]);
    const showError = mockConsole([]);
    assert.doesNotThrow(() =>
      main(log, showError, () => { }, ['--help']));
  });

  it( 'should show error illegal line count', () => {
    const log = mockConsole([]);
    const showError = mockConsole([['head:', 'illegal line count -- a']]);
    assert.doesNotThrow(() =>
      main(log, showError, () => { }, ['-na']));
  });

  it( 'should show error illegal line count', () => {
    const log = mockConsole([]);
    const showError = mockConsole([['head:', 'illegal line count -- -1']]);
    
    assert.doesNotThrow(() =>
      main(log, showError, () => { }, ['-n-1']));
  });
});
