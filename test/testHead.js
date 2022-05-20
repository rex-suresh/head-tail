const assert = require('assert');
const { head, firstNLines } = require('../src/head.js');

describe( 'head', () => {
  it( 'should return single line', () => {
    assert.equal(head('hello', 1), 'hello');
    assert.equal(head('tata', 1), 'tata');
  });

  it( 'should return two lines', () => {
    assert.equal(head('hello\ntata', 2), 'hello\ntata');
  });

  it( 'should return 1 line from lines given', () => {
    assert.equal(head('', 1), '');
    assert.equal(head('hello\ntata', 1), 'hello');
  });

  it( 'should return 4 lines from lines given', () => {
    assert.equal(head('', 4), '');
    assert.equal(head('hello\ntata\nbye', 4), 'hello\ntata\nbye');
    assert.equal(head('hello\ntata\nbye\nhi', 4), 'hello\ntata\nbye\nhi');
  });
});

describe( 'first-N-Lines', () => {
  it('should return 1 line from lines', () => {
    assert.strict.deepEqual(firstNLines([], 1), []);
    assert.strict.deepEqual(firstNLines(['a', 'b', 'c'], 1), ['a']);
  });

  it('should return 2 lines from given lines', () => {
    assert.strict.deepEqual(firstNLines(['a', 'b', 'c'], 2), ['a', 'b']);
  });
});
