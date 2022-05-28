const assert = require('assert');
const { separateOptVal, separateArgs, parseOption, isOption } =
  require('../../src/head/fetch.js');

describe( 'separateOptVal', () => {
  it( 'should separate \'-c8\' to -c, 8', () => {
    assert.strict.deepEqual(separateOptVal('-c8'), ['-c', '8']);
  });

  it( 'should separate \'-8\' to -, 8', () => {
    assert.strict.deepEqual(separateOptVal('-8'), ['-', '8']);
  });
});

describe( 'isOption', () => {
  it( 'should return true for -c as arg', () => {
    assert.equal(isOption('-c2'), true);
  });

  it( 'should return false for +c as arg', () => {
    assert.equal(isOption('+c9'), false);
  });
});

describe( 'separateArgs', () => {
  it( 'should separate one option and one file', () => {
    assert.strict.deepEqual(separateArgs(['-c8', 'apple']),
      {options: [{option: '-c', limit: '8'}], files: ['apple']});
  });

  it( 'should separate two option and file', () => {
    assert.strict.deepEqual(separateArgs(['-n1', '-n3', 'apple']),
      {
        options: [
          { option: '-n', limit: '1' },
          { option: '-n', limit: '3' }],
        files: ['apple']
      });
  });

  it( 'should separate option and files', () => {
    assert.strict.deepEqual(separateArgs(['-n13', 'apple', 'banana']),
      {
        options: [{ option: '-n', limit: '13' }],
        files: ['apple', 'banana']
      });
  });

  it( 'should separate invalid option and no files', () => {
    assert.strict.deepEqual(separateArgs(['-n+13']),
      {
        options: [{ option: '-n', limit: '+13' }],
        files: []
      });
  });
});

describe( 'parseOption', () => {
  it( 'should parse a option with option -n', () => {
    assert.strict.deepEqual(parseOption(
      { option: '-n', limit: 13 }),
    { option: '-n', limit: 13, filterOn: 'lines'});
  });

  it( 'should parse a option with option -c', () => {
    assert.strict.deepEqual(parseOption(
      { option: '-c', limit: 13 }),
    { option: '-c', limit: 13, filterOn: 'bytes'});
  });
  it( 'should parse a option with option -', () => {
    assert.strict.deepEqual(parseOption(
      { option: '-', limit: 13 }),
    { option: '-', limit: 13, filterOn: 'lines'});
  });
});
