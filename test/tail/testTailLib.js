const assert = require('assert');
const { tail, itemsOf } = require('../../src/tail/tailLib.js');

describe( 'tail', () => {
  it( 'should give one line, from content', () => {
    assert.equal(
      tail('hello', { start: 0, count: 1, filterOn: 'lines' }), 'hello');
    assert.equal(
      tail('', { start: 0, count: 1, filterOn: 'lines' }), '');
    assert.equal(
      tail('hi\nhello', { start: 0, count: 1, filterOn: 'lines' }), 'hello');
  });

  it( 'should give one byte, from content', () => {
    assert.equal(
      tail('hello', { start: 0, count: 1, filterOn: 'bytes' }), 'o');
    assert.equal(
      tail('', { start: 0, count: 1, filterOn: 'bytes' }), '');
    assert.equal(
      tail('hi\nhello', { start: 0, count: 1, filterOn: 'bytes' }), 'o');
  });

  it( 'should give lines, from 1 in content', () => {
    assert.equal(
      tail('hello\nhi\nhey',
        { start: 1, count: 0, filterOn: 'lines' }), 'hello\nhi\nhey');
    assert.equal(
      tail('',
        { start: 1, count: 0, filterOn: 'lines' }), '');
    assert.equal(
      tail('hi\nhello',
        { start: 1, count: 0, filterOn: 'lines' }), 'hi\nhello');
  });

  it( 'should give lines, from 2 in content', () => {
    assert.equal(
      tail('hello\nhi\nhey',
        { start: 2, count: 0, filterOn: 'lines' }), 'hi\nhey');
    assert.equal(
      tail('',
        { start: 2, count: 0, filterOn: 'lines' }), '');
    assert.equal(
      tail('hi\nhello',
        { start: 2, count: 0, filterOn: 'lines' }), 'hello');
  });

  it( 'should give bytes, from 1 in content', () => {
    assert.equal(
      tail('hello\nhi\nhey',
        { start: 1, count: 0, filterOn: 'bytes' }), 'hello\nhi\nhey');
    assert.equal(
      tail('',
        { start: 1, count: 0, filterOn: 'bytes' }), '');
    assert.equal(
      tail('hi\nhello',
        { start: 1, count: 0, filterOn: 'bytes' }), 'hi\nhello');
  });

  // it( 'should give 0 elements', () => {
  //   assert.equal(
  //     tail('hello\nhi\nhey',
  //       { start: -1, count: -2, filterOn: 'bytes' }), '');
  //   assert.equal(
  //     tail('hello\nhi\nhey',
  //       { start: -1, count: -2, filterOn: 'lines' }), '');
  // }); // unnecessary test
  
  it( 'should give bytes, from 2 in content', () => {
    assert.equal(
      tail('hello\nhi\nhey',
        { start: 2, count: 0, filterOn: 'bytes' }), 'ello\nhi\nhey');
    assert.equal(
      tail('',
        { start: 2, count: 0, filterOn: 'bytes' }), '');
    assert.equal(
      tail('hi\nhello',
        { start: 2, count: 0, filterOn: 'bytes' }), 'i\nhello');
  });
});

describe( 'itemsOf', () => {
  it( 'should return single line from content', () => {
    assert.equal(itemsOf('hello', 0, 1, '\n'), 'hello');
    assert.equal(itemsOf('hello\nhi', 0, 1, '\n'), 'hi');
  });
  it( 'should return rest of lines from content', () => {
    assert.equal(itemsOf('hello\nhi', 1, 0, '\n'), 'hi');
    assert.equal(itemsOf('hello\nhi', 2, 0, '\n'), '');
  });

  it( 'should return rest of bytes from content', () => {
    assert.equal(itemsOf('hello\nhi', 1, 0, ''), 'ello\nhi');
    assert.equal(itemsOf('hello\nhi', 2, 0, ''), 'llo\nhi');
  });

  it( 'should return single byte from content', () => {
    assert.equal(itemsOf('hello', 0, 1, ''), 'o');
    assert.equal(itemsOf('hello\nhi', 0, 1, ''), 'i');
  });
});
