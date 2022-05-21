const assert = require('assert');
const { parseArgs, isOption, parseOption } = require('../src/parseArgs.js');

describe( 'isOption', () => {
  it( 'should return `true` when -c/-n provided', () => {
    assert.equal(isOption('-c'), true);
    assert.equal(isOption('-n'), true);
  });

  it( 'should return `false` when option is invalid', () => {
    assert.equal(isOption('c'), false);
    assert.equal(isOption('-x'), false);
  });

  it( 'should return `false` when number is provided', () => {
    assert.equal(isOption('12'), false);
  });
});

describe( 'parseOption', () => {
  it( 'should return object of "\n" ', () => {
    assert.strict.deepEqual(parseOption('-n', 2),
      { separator: '\n', itemCount: 2 });
    assert.strict.deepEqual(parseOption('-n', 10),
      { separator: '\n', itemCount: 10 });
  });

  it( 'should return object of "" ', () => {
    assert.strict.deepEqual(parseOption('-c', 1),
      { separator: '', itemCount: 1 });
    assert.strict.deepEqual(parseOption('-c', 10),
      { separator: '', itemCount: 10 });
  });
});

describe( 'parseArgs', () => {
  it( 'should return a object with option and single fileName', () => {
    assert.strict.deepEqual( parseArgs(['-c', '10', 'a']),
      { option: { separator: '', itemCount: 10 }, files: ['a'] });
    assert.strict.deepEqual( parseArgs(['-n', '3', 'b']),
      { option: { separator: '\n', itemCount: 3 }, files: ['b'] });
  });

  it('should return a object with option and multiple files list', () => {
    assert.strict.deepEqual( parseArgs(['-c', '10', 'a', 'b']),
      { option: { separator: '', itemCount: 10 }, files: ['a', 'b'] });
    assert.strict.deepEqual( parseArgs(['-n', '10', 'a', 'c']),
      { option: { separator: '\n', itemCount: 10 }, files: ['a', 'c'] });
  });

  it('should return a object with option and fileList', () => {
    assert.strict.deepEqual( parseArgs(['-c', '10', '-c', '20', 'a']),
      { option: { separator: '', itemCount: 20 }, files: ['a'] });
    assert.strict.deepEqual( parseArgs(['-n', '10', '-n', '5', 'c']),
      { option: { separator: '\n', itemCount: 5 }, files: ['c'] });
  });

  it('should throw an error when multiple options are used', () => {
    assert.throws(parseArgs.bind(null,
      ['-c', '10', '-n', '20', 'a']),
    {
      message: 'can\'t combine line and byte counts'
    }
    );
    assert.throws(parseArgs.bind(null,
      ['-n', '10', '-c', '5', 'c']),
    {
      message: 'can\'t combine line and byte counts'
    }
    );
  });

  it('should throw an error when option values are invalid', () => {
    assert.throws(parseArgs.bind(null,
      ['-n', '-10', 'a']), { message: 'illegal line count ---10' });
    assert.throws(parseArgs.bind(null,
      ['-c', '-10', 'a']), { message: 'illegal line count ---10' });
  });

  
});
