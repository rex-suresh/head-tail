const assert = require('assert');
const { validateArgs } = require(
  '../../src/head/validate.js');

describe( 'checkArgs', () => {
  it( 'should not throw an error when args are as expected', () => {
    assert.doesNotThrow(() => validateArgs({
      options:
        [{ limit: 2, option: '-n' }], files: ['apple']
    }));
    assert.doesNotThrow(() => validateArgs({
      options:
        [{ limit: 1, option: '-c' }], files: ['banana']
    }));
  });

  it( 'should throw combined option error', () => {
    assert.throws(() => validateArgs({
      options:
        [{ limit: 2, option: '-n' },
          { limit: 2, option: '-c' }], files: ['apple']
    }), {
      message: 'can\'t combine line and byte counts'
    });
  });

  it( 'should throw illegal option error', () => {
    assert.throws(() => validateArgs({
      options:
        [{ limit: 2, option: '-x' }], files: ['apple']
    }), {
      message:
        'illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it( 'should throw illegal value error', () => {
    assert.throws(() => validateArgs({
      options:
        [{ limit: -2, option: '-n' }], files: ['apple']
    }), {
      message: 'illegal line count -- -2'
    });
  });

  it( 'should throw illegal value error when letter is given as value', () => {
    assert.throws(() => validateArgs({
      options:
        [{ limit: 'a', option: '-n' }], files: ['apple']
    }), {
      message: 'illegal line count -- a'
    });
  });
});
