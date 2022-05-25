const assert = require('assert');
const { parseTailOption } =
  require('../../src/tail/fetch.js');

describe( 'parseTailOption', () => {
  it( 'should parse a option with option -n, negative num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-n', limit: '-13' }),
    { option: '-n', start: 0, count: 13, filterOn: 'lines'});
  });

  it( 'should parse a option with option -n, preceding + num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-n', limit: '+13' }),
    { option: '-n', start: 13, count: 0, filterOn: 'lines'});
  });

  it( 'should parse a option with option -n, positive num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-n', limit: '13' }),
    { option: '-n', start: 0, count: 13, filterOn: 'lines'});
  });
  it( 'should parse a option with option -c, negative num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-c', limit: '-13' }),
    { option: '-c', start: 0, count: 13, filterOn: 'bytes'});
  });

  it( 'should parse a option with option -c, preceding + num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-c', limit: '+13' }),
    { option: '-c', start: 13, count: 0, filterOn: 'bytes'});
  });

  it( 'should parse a option with option -c, positive num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-c', limit: '13' }),
    { option: '-c', start: 0, count: 13, filterOn: 'bytes'});
  });
  it( 'should parse a option with option -, negative num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-', limit: '-13' }),
    { option: '-', start: 0, count: 13, filterOn: 'lines'});
  });

  it( 'should parse a option with option -, preceding + num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-', limit: '+13' }),
    { option: '-', start: 13, count: 0, filterOn: 'lines'});
  });

  it( 'should parse a option with option -, positive num', () => {
    assert.strict.deepEqual(parseTailOption(
      { option: '-', limit: '13' }),
    { option: '-', start: 0, count: 13, filterOn: 'lines'});
  });
});
