const assert = require('assert');
const { checkArgs } = require(
  '../src/validate.js');

describe.only( 'checkArgs', () => {
  it( 'should not throw an error when args are as expected', () => {
    assert.doesNotThrow(() => checkArgs({
      options:
        [{ limit: 2, option: '-n' }], files: ['apple']
    }));
    assert.doesNotThrow(() => checkArgs({
      options:
        [{ limit: 1, option: '-c' }], files: ['banana']
    }));
  });

  it( 'should throw combined option error', () => {
    assert.throws(() => checkArgs({
      options:
        [{ limit: 2, option: '-n' },
          { limit: 2, option: '-c' }], files: ['apple']
    }), {
      message: 'can\'t combine line and byte counts'
    });
  });

  it( 'should throw illegal option error', () => {
    assert.throws(() => checkArgs({
      options:
        [{ limit: 2, option: '-x' }], files: ['apple']
    }), {
      message: 'illegal option ---x'
    });
  });

  it( 'should throw illegal value error', () => {
    assert.throws(() => checkArgs({
      options:
        [{ limit: -2, option: '-n' }], files: ['apple']
    }), {
      message: 'illegal line count ---2'
    });
  });
});
