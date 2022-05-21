const assert = require('assert');
const { headMain } = require('../src/headMain.js');

const shouldReturn = (content, expFile, expEncoding) =>
  (fileName, encoding) => {
    assert.equal(fileName, expFile);
    assert.deepEqual(encoding, expEncoding);
    return content;
  };

describe( 'headMain', () => {
  it( 'should return 1 element based on option', () => {
    assert.equal(headMain(shouldReturn('hello', 'hello.txt', 'utf8')
      , {}, 'hello.txt'), 'hello');
    
    assert.equal(headMain(shouldReturn('hello', 'hello.txt', 'utf8')
      , { separator: '', itemCount: 1 }, 'hello.txt'), 'h');
    
    assert.equal(headMain(shouldReturn('hello\nbye', 'hello.txt', 'utf8')
      , {separator: '\n', itemCount: 1}, 'hello.txt'), 'hello');
  });

  it( 'should return 2 elements based on option', () => {
    assert.equal(headMain(shouldReturn('hello', 'hello.txt', 'utf8')
      , { separator: '', itemCount: 2 }, 'hello.txt'), 'he');
    
    assert.equal(headMain(shouldReturn('hello\nbye', 'hello.txt', 'utf8')
      , {separator: '\n', itemCount: 2}, 'hello.txt'), 'hello\nbye');
  });
});
