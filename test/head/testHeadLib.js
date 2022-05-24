const assert = require('assert');
const { head, separateParts, firstNParts } =
  require('../../src/head/headLib.js');

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

describe( 'separateParts', () => {
  it( 'should separate string content based on separator provided', () => {
    assert.strict.deepEqual(separateParts('a\nb\nc', '\n'), ['a', 'b', 'c']);
    assert.strict.deepEqual(separateParts('abc', ''), ['a', 'b', 'c']);
  });
});

describe( 'firstNParts', () => {
  it( 'should separate string content based on separator provided', () => {
    assert.strict.deepEqual(firstNParts('a\nb\nc', 1, '\n'), 'a');
    assert.strict.deepEqual(firstNParts('abc', 2, ''), 'ab');
  });
});
