import { getCachedDefaultOptions, setCachedDefaultOptions } from './makeSrcSetCache'
const config = require('@plone/volto/registry').default;

const makeSrcSet = (options) => {
  let processedOptions;
  let isDefaultObject = options === undefined;
  if (isDefaultObject) {
    // Optimizing 1. If this is the default object - use cached value
    const cachedDefaultOptions = getCachedDefaultOptions();
    if (cachedDefaultOptions) {
      processedOptions = cachedDefaultOptions;
    }
  } else if (options.hasOwnProperty('fromProps')) {
    // Optimizing 2. If already a cooked object - just use it.
    processedOptions = options.processedOptions;
  }
  if (!processedOptions) {
    // Calculating
    options = Object.assign(
      {
        enabled: true,
        isLocal: (src) => true,
        createScaleUrl: (src, scaleName) =>
          `${src}/@@images/image/${scaleName}`,
        minWidth: 0,
        maxWidth: Infinity,
        scales: [
          ['icon', 32],
          ['tile', 64],
          ['thumb', 128],
          ['mini', 200],
          ['preview', 400],
          ['teaser', 600],
          ['large', 800],
          ['great', 1200],
          ['huge', 1600],
        ],
      },
      config.settings.makeSrcSet,
      options,
    );
    const sortedScales = [].concat(options.scales);
    sortedScales.sort(([_a, widthA], [_b, widthB]) => widthA - widthB);
    options.scales = sortedScales.filter(
      ([_, width]) => options.minWidth <= width && width <= options.maxWidth,
    );
    processedOptions = options;
    if (isDefaultObject) {
      setCachedDefaultOptions(options);
    }
  }
  return {
    processedOptions,
    fromProps({ src, defaultScale }) {
      const {
        enabled,
        isLocal,
        createScaleUrl,
        scales,
      } = this.processedOptions;
      const result = {};
      if (enabled && isLocal(src)) {
        src = src.replace(/\/@@images\/image\/.*$/, '');
        src = src.replace(/\/$/, '');
        const srcSet = scales.map(
          ([scaleName, width]) => `${createScaleUrl(src, scaleName)} ${width}w`,
        );
        result.srcSet = srcSet;
        if (defaultScale) {
          result.src = createScaleUrl(src, defaultScale);
          result.defaultScale = undefined;
        }
      }
      return result;
    },
  };
};
export default makeSrcSet;
