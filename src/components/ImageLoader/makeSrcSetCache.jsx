let _cachedDefaultOptions;

export const getCachedDefaultOptions = () => _cachedDefaultOptions;
export const setCachedDefaultOptions = (options) => {
  _cachedDefaultOptions = options;
};
