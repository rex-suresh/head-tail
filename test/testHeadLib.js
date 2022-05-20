const assert = require('assert');
const { head, firstNLines } = require('../src/headLib.js');

describe( 'head', () => {
  it( 'should return single line', () => {
    assert.equal(head('hello', 1, '\n'), 'hello');
    assert.equal(head('tata', 1, '\n'), 'tata');
  });

  it( 'should return two lines', () => {
    assert.equal(head('hello\ntata', 2, '\n'), 'hello\ntata');
  });

  it( 'should return 1 line from lines given', () => {
    assert.equal(head('', 1, '\n'), '');
    assert.equal(head('hello\ntata', 1, '\n'), 'hello');
  });

  it( 'should return 4 lines from lines given', () => {
    assert.equal(head('', 4, '\n'), '');
    assert.equal(head('hello\ntata\nbye', 4, '\n'), 'hello\ntata\nbye');
    assert.equal(head('hello\ntata\nbye\nhi', 4, '\n'), 'hello\ntata\nbye\nhi');
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
