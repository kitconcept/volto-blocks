const config = require('@plone/volto/registry').default;

const makeSrcSet = (options) => {
  if (options && options.hasOwnProperty('fromProps')) {
    // If already a cooked object - just use it.
    options = options.options;
  } else {
    // Calculating
    options = Object.assign(
      {
        enabled: true,
        isLocal: (src) => true,
        preprocessSrc: (src) =>
          src.replace(/\/@@images\/image\/.*$/, '').replace(/\/$/, ''),
        createScaledSrc: (src, scaleName, scaleData) => ({
          url: `${src}/@@images/image/${scaleName}`,
          width: scaleData,
        }),
        minWidth: 0,
        maxWidth: Infinity,
        scales: {
          // These are meaningful default however an application should provide
          // a custom createScaleUrl which can accept a scale info object instead of the width
          // we use here.
          icon: 32,
          tile: 64,
          thumb: 128,
          mini: 200,
          preview: 400,
          teaser: 600,
          large: 800,
          great: 1200,
          huge: 1600,
        },
      },
      config.settings.srcSetOptions,
      options,
    );
  }
  return {
    options,
    fromProps({ src, defaultScale, scales }) {
      const { enabled, isLocal, preprocessSrc, createScaledSrc } = this.options;
      const result = {};
      if (enabled && isLocal(src)) {
        src = preprocessSrc(src);
        if (scales) {
          result.scales = undefined;
        } else {
          scales = this.options.scales;
        }
        if (typeof scales !== 'object') {
          throw new Error('The scales option and property must be an object');
        }
        let scaledSrcList = Object.keys(scales).map((scaleName) =>
          createScaledSrc(src, scaleName, scales[scaleName]),
        );
        scaledSrcList.sort(
          ({ width: widthA }, { width: widthB }) => widthA - widthB,
        );
        scaledSrcList = scaledSrcList.filter(
          ({ width }) => options.minWidth <= width && width <= options.maxWidth,
        );
        result.srcSet = scaledSrcList.map(
          ({ url, width }) => `${url} ${width}w`,
        );
        if (defaultScale) {
          // If no scale available, silently ignore creating a source.
          if (scales.hasOwnProperty(defaultScale)) {
            result.src = createScaledSrc(
              src,
              defaultScale,
              scales[defaultScale],
            ).url;
          }
          result.defaultScale = undefined;
        }
      } else {
        // remove special properties in all cases
        if (scales) {
          result.scales = undefined;
        }
        if (defaultScale) {
          result.defaultScale = undefined;
        }
      }
      return result;
    },
  };
};
export default makeSrcSet;
