import {
  getCachedDefaultOptions,
  setCachedDefaultOptions,
} from './cachedDefaultOptions';
import BlurhashCanvas from './BlurhashCanvas';
const config = require('@plone/volto/registry').default;

const OPTIONS_CACHE_KEY = 'blurhash';

const makeBlurhash = (options) => {
  let processedOptions;
  let isDefaultObject = options === undefined;
  if (isDefaultObject) {
    // Optimizing 1. If this is the default object - use cached value
    const cachedDefaultOptions = getCachedDefaultOptions(OPTIONS_CACHE_KEY);
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
        resolutionX: 32,
        resolutionY: 32,
        punch: 1,
        style: {},
      },
      config.settings.blurhash,
      options,
    );
    processedOptions = options;
    if (isDefaultObject) {
      setCachedDefaultOptions(OPTIONS_CACHE_KEY, options);
    }
  }
  return {
    processedOptions,
    fromProps({ placeholder, blurhash }) {
      const { resolutionX, resolutionY, style } = this.processedOptions;
      const result = {};
      if (blurhash) {
        if (placeholder) {
          throw new Error(
            'blurhash and placeholder properties cannot both be specified',
          );
        }
        const [ratioStr, hash] = blurhash.split(':');
        const ratio = parseFloat(ratioStr);
        result.placeholder = (
          <BlurhashCanvas
            style={style}
            hash={hash}
            ratio={ratio}
            width={resolutionX}
            height={resolutionY}
          />
        );

        result.blurhash = undefined;
      }
      return result;
    },
  };
};
export default makeBlurhash;
