const assert = require('assert');
const { head } = require('../src/head');

describe( 'head', () => {
  it( 'should return single line', () => {
    assert.strict.deepEqual(head('hello'), 'hello');
    assert.strict.deepEqual(head('tata'), 'tata');
  });

  it( 'should return two lines', () => {
    assert.strict.deepEqual(head('hello\ntata'), 'hello\ntata');
  });
});
