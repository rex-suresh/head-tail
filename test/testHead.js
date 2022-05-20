const assert = require('assert');
const { head } = require('../src/head.js');

describe( 'head', () => {
  it( 'should return single line', () => {
    assert.equal(head('hello'), 'hello');
    assert.equal(head('tata'), 'tata');
  });

  it( 'should return two lines', () => {
    assert.equal(head('hello\ntata'), 'hello\ntata');
  });
});
