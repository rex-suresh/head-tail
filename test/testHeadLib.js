const assert = require('assert');
const { head } = require('../src/headLib.js');

describe( 'head', () => {
  it( 'should return single line', () => {
    assert.equal(head('hello', 1, '\n'), 'hello');
    assert.equal(head('tata', {itemCount: 1, separator: '\n'}), 'tata');
  });

  it( 'should return two lines', () => {
    assert.equal(head('hello\ntata', {itemCount: 2, separator: '\n'}),
      'hello\ntata');
  });

  it( 'should return 1 line from lines given', () => {
    assert.equal(head('', {itemCount: 1, separator: '\n'}), '');
    assert.equal(head('hello\ntata', {itemCount: 1, separator: '\n'}), 'hello');
  });

  it( 'should return 4 lines from lines given', () => {
    assert.equal(head('', {itemCount: 4, separator: '\n'}), '');
    assert.equal(head('hello\ntata\nbye',
      { itemCount: 4, separator: '\n' }), 'hello\ntata\nbye');
    assert.equal(head('hello\ntata\nbye\nhi',
      { itemCount: 4, separator: '\n' }), 'hello\ntata\nbye\nhi');
  });

  it( 'should return 1 byte from lines given', () => {
    assert.equal(head('', {itemCount: 1, separator: ''}), '');
    assert.equal(head('\n', {itemCount: 1, separator: ''}), '\n');
    assert.equal(head('hello', {itemCount: 1, separator: ''}), 'h');
    assert.equal(head('tata', {itemCount: 1, separator: ''}), 't');
  });

  it( 'should return 2 byte from lines given', () => {
    assert.equal(head( ' ', {itemCount: 2, separator: ''}), ' ');
    assert.equal(head('\n ', {itemCount: 2, separator: ''}), '\n ');
    assert.equal(head( 'hello', { itemCount: 2, separator: ''}), 'he');
    assert.equal(head('tata', {itemCount: 2, separator: ''}), 'ta');
  });
});
