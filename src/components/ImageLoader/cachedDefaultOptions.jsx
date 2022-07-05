let _cachedDefaultOptions = {};

export const getCachedDefaultOptions = (key) => _cachedDefaultOptions[key];
export const setCachedDefaultOptions = (key, options) => {
  _cachedDefaultOptions[key] = options;
};
