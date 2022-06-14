import {
  getCachedDefaultOptions,
  setCachedDefaultOptions,
} from './makeSrcSetCache';

describe('makeSrcSetCache', () => {
  const testWithValue = (v) => () => {
    setCachedDefaultOptions(v);
    expect(getCachedDefaultOptions()).toBe(v);
  };
  test('works', testWithValue('{OPTIONS1}'));
  test('works', testWithValue('{OPTIONS2}'));
});
