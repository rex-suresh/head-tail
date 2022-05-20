const assert = require('assert');
const { head, firstNLines } = require('../src/head.js');

describe( 'head', () => {
  it( 'should return single line', () => {
    assert.equal(head('hello'), 'hello');
    assert.equal(head('tata'), 'tata');
  });

  it( 'should return two lines', () => {
    assert.equal(head('hello\ntata'), 'hello\ntata');
  });
});

describe( 'first-N-Lines', () => {
  it('should return 1 line from lines', () => {
    assert.strict.deepEqual(firstNLines([], 1), []);
    assert.strict.deepEqual(firstNLines(['a', 'b', 'c'], 1), ['a']);
  });
});
