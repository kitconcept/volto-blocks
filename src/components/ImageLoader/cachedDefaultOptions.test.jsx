import {
  getCachedDefaultOptions,
  setCachedDefaultOptions,
} from './cachedDefaultOptions';

describe('cachedDefaultOptions', () => {
  test('works', () => {
    setCachedDefaultOptions('K1', '{OPTIONS1}');
    expect(getCachedDefaultOptions('K1')).toBe('{OPTIONS1}');
  });
  test('works repeatedly', () => {
    setCachedDefaultOptions('K1', '{OPTIONS1}');
    setCachedDefaultOptions('K1', '{OPTIONS2}');
    expect(getCachedDefaultOptions('K1')).toBe('{OPTIONS2}');
  });
  test('works with keys', () => {
    setCachedDefaultOptions('K1', '{OPTIONS1}');
    setCachedDefaultOptions('K2', '{OPTIONS2}');
    expect(getCachedDefaultOptions('K1')).toBe('{OPTIONS1}');
    expect(getCachedDefaultOptions('K2')).toBe('{OPTIONS2}');
  });
});
