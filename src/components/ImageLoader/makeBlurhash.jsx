import BlurhashCanvas from './BlurhashCanvas';
const config = require('@plone/volto/registry').default;

const makeBlurhash = (options) => {
  if (options && options.hasOwnProperty('fromProps')) {
    // If already a cooked object - just use it.
    options = options.options;
  } else {
    // Calculating
    options = Object.assign(
      {
        resolutionX: 32,
        resolutionY: 32,
        punch: 1,
        style: {},
      },
      config.settings.blurhashOptions,
      options,
    );
  }
  return {
    options,
    fromProps({ placeholder, blurhash }) {
      const { resolutionX, resolutionY, punch, style } = this.options;
      const result = {};
      if (blurhash) {
        if (placeholder) {
          throw new Error(
            'blurhash and placeholder properties cannot both be specified',
          );
        }
        // Note the hash itself may contain the delimiter
        const delimiter = blurhash.indexOf(':');
        const ratio = parseFloat(blurhash.substring(0, delimiter));
        const hash = blurhash.substring(delimiter + 1);
        result.placeholder = (
          <BlurhashCanvas
            style={style}
            hash={hash}
            ratio={ratio}
            punch={punch}
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
