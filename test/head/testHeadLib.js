const assert = require('assert');
const {
  head, firstNParts, firstNLines, firstNBytes,
  readFileContent, captureHead } =
  require('../../src/head/headLib.js');

const mockReadFile = (content, expFileName, expEncoding) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(fileName, expFileName[index]);
    assert.strictEqual(encoding, expEncoding);
    index++;
    return content[index - 1];
  };
};

const mockErrorReadFile = (error, expFileName, expEncoding) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(fileName, expFileName[index]);
    assert.strictEqual(encoding, expEncoding);
    index++;
    throw error[index - 1];
  };
};
  
describe( 'head', () => {
  it( 'should return single line', () => {
    assert.equal(head('hello', { limit: 1, option: '-n', filterOn: 'lines' }),
      'hello');
    assert.equal(head('tata', { limit: 1, option: '-n', filterOn: 'lines' }),
      'tata');
  });

  it( 'should return two lines', () => {
    assert.equal(head('hello\ntata\nbye',
      { limit: 2, option: '-n', filterOn: 'lines' }),
    'hello\ntata');
  });

  it( 'should return 1 byte from lines given', () => {
    assert.equal(head('', {limit: 1, option: '-c', filterOn: 'bytes'}),
      '');
    assert.equal(head('\n', {limit: 1, option: '-c', filterOn: 'bytes'}),
      '\n');
    assert.equal(head('hello', {limit: 1, option: '-c', filterOn: 'bytes'}),
      'h');
    assert.equal(head('tata', {limit: 1, option: '-c', filterOn: 'bytes'}),
      't');
  });

  it( 'should return 2 byte from lines given', () => {
    assert.equal(head( ' ', {limit: 2, option: '-c', filterOn: 'bytes'}),
      ' ');
    assert.equal(head('\n ', {limit: 2, option: '-c', filterOn: 'bytes'}),
      '\n ');
    assert.equal(head( 'hello', { limit: 2, option: '-c', filterOn: 'bytes'}),
      'he');
    assert.equal(head('tata', {limit: 2, option: '-c', filterOn: 'bytes'}),
      'ta');
  });
});

describe( 'firstNParts', () => {
  it( 'should return string based on separator and itemCount provided', () => {
    assert.equal(firstNParts('a\nb\nc', 1, '\n'), 'a');
    assert.equal(firstNParts('abc', 2, ''), 'ab');
  });

});

describe('firstNLines', () => {
  it( 'should return string based on lineCount provided', () => {
    assert.equal(firstNLines('1\n2', 1), '1');
    assert.equal(firstNLines('1\n2\n3', 2), '1\n2');
  });
});

describe('firstNLines', () => {
  it( 'should return string based on lineCount provided', () => {
    assert.equal(firstNBytes('12', 1), '1');
    assert.equal(firstNBytes('123', 2), '12');
  });
});

describe( 'readFileContent', () => {
  it( 'should return an content object with name and fileContent', () => {
    const readFile = mockReadFile(['hey'], ['a.file'], 'utf8');
    const expected = {content: 'hey', fileName: 'a.file'};
    assert.deepStrictEqual(readFileContent('a.file', readFile), expected);
  });

  it('should return an error object with name and "no file" error', () => {
    const errors = [
      { message: 'ENOENT: no such file or directory, open \'abc\'' }
    ];
    const readFile = mockErrorReadFile(errors, ['abc'], 'utf8');
    const expected = {
      error: 'head: abc: No such file or directory',
      fileName: 'abc'
    };
    assert.deepStrictEqual(readFileContent('abc', readFile), expected);
  });

  it('should return an error object with name and "permission" error', () => {
    const errors = [
      { message: 'EACCES: permission denied, open \'xyz\'' }
    ];
    const readFile = mockErrorReadFile(errors, ['xyz'], 'utf8');
    const expected = {
      error: 'head: xyz: Permission denied',
      fileName: 'xyz'
    };
    assert.deepStrictEqual(readFileContent('xyz', readFile), expected);
  });
});

describe( 'captureHead', () => {
  it('should head content, return fileObject with content'
    , () => {
      const fileContent = {
        content: 'hello\nbye',
        fileName: 'a.txt'
      };
      const option = { limit: 1, option: '-n', filterOn: 'lines'};
      const expected = {
        content: 'hello\nbye',
        fileName: 'a.txt',
        header: '==> a.txt <==',
        headOutput: 'hello'
      };

      assert.deepStrictEqual(captureHead(fileContent, option), expected);
    });
  
  it('should return error object, when provided with error'
    , () => {
      const fileContent = {
        error: 'this is a error',
        fileName: 'a.txt'
      };
      const option = { limit: 1, option: '-n', filterOn: 'lines'};
      const expected = {
        error: 'this is a error',
        fileName: 'a.txt'
      };

      assert.deepStrictEqual(captureHead(fileContent, option), expected);
    });
});
