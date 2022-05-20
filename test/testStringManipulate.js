const assert = require('assert');
const { separateComponents, joinComponents, firstNItems } =
  require('../src/stringManipulate.js');

describe( 'separateComponents', () => {
  it( 'should return elements as array separated at EMPTY ""', () => {
    assert.deepEqual(separateComponents('', ''), []);
    assert.deepEqual(separateComponents('a', ''), ['a']);
    assert.deepEqual(separateComponents('ab', ''), ['a', 'b']);
  });

  it( 'should return elements as array separated at "\n"', () => {
    assert.deepEqual(separateComponents('', '\n'), ['']);
    assert.deepEqual(separateComponents('a', '\n'), ['a']);
    assert.deepEqual(separateComponents('a\nb', '\n'), ['a', 'b']);
  });
});

describe( 'joinComponents', () => {
  it( 'should return elements as array separated at EMPTY ""', () => {
    assert.deepEqual(joinComponents([''], ''), '');
    assert.deepEqual(joinComponents(['a'], ''), 'a');
    assert.deepEqual(joinComponents(['a', 'b'], ''), 'ab');
  });

  it( 'should return elements as array separated at "\n"', () => {
    assert.deepEqual(joinComponents([''], '\n'), '');
    assert.deepEqual(joinComponents(['a'], '\n'), 'a');
    assert.deepEqual(joinComponents(['a', 'b'], '\n'), 'a\nb');
  });
});

describe( 'firstNItems', () => {
  it( 'should return first 1 element as array', () => {
    assert.deepEqual(firstNItems([''], 1), ['']);
    assert.deepEqual(firstNItems(['1'], 1), ['1']);
    assert.deepEqual(firstNItems(['a', 'b'], 1), ['a']);
  });

  it( 'should return first 2 elements as array', () => {
    assert.deepEqual(firstNItems([''], 2), ['']);
    assert.deepEqual(firstNItems(['a'], 2), ['a']);
    assert.deepEqual(firstNItems(['a', 'b'], 2), ['a', 'b']);
  });
});
