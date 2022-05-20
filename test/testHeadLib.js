const assert = require('assert');
const { head, firstNItems } = require('../src/headLib.js');

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

  it( 'should return 1 byte from lines given', () => {
    assert.equal(head('', 1, ''), '');
    assert.equal(head('\n', 1, ''), '\n');
    assert.equal(head('hello', 1, ''), 'h');
    assert.equal(head('tata', 1, ''), 't');
  });

  it( 'should return 2 byte from lines given', () => {
    assert.equal(head(' ', 2, ''), ' ');
    assert.equal(head('\n ', 2, ''), '\n ');
    assert.equal(head('hello', 2, ''), 'he');
    assert.equal(head('tata', 2, ''), 'ta');
  });
});

describe( 'first-N-Components', () => {
  it('should return 1 components from items', () => {
    assert.strict.deepEqual(firstNItems([], 1), []);
    assert.strict.deepEqual(firstNItems(['a', 'b', 'c'], 1), ['a']);
  });

  it('should return 2 components from given items', () => {
    assert.strict.deepEqual(firstNItems(['a', 'b', 'c'], 2), ['a', 'b']);
  });
});
