import makeSrcSet from './makeSrcSet';
import config from '@plone/volto/registry';

let mockCachedDefaultOptions;
jest.mock('./makeSrcSetCache', () => {
  return {
    __esModule: true,
    getCachedDefaultOptions: () => mockCachedDefaultOptions,
    setCachedDefaultOptions: (options) => {
      mockCachedDefaultOptions = options;
    },
  };
});

describe('makeSrcSet', () => {
  let options;
  let origMakeSrcSet;

  beforeEach(() => {
    jest.clearAllMocks();
    options = {};
    origMakeSrcSet = config.settings.makeSrcSet;
    config.settings.makeSrcSet = options;
    mockCachedDefaultOptions = undefined;
  });

  afterEach(() => {
    config.settings.makeSrcSet = origMakeSrcSet;
  });

  describe('fromProps generates scrSet', () => {
    const result = [
      '/foo/bar.jpg/@@images/image/icon 32w',
      '/foo/bar.jpg/@@images/image/tile 64w',
      '/foo/bar.jpg/@@images/image/thumb 128w',
      '/foo/bar.jpg/@@images/image/mini 200w',
      '/foo/bar.jpg/@@images/image/preview 400w',
      '/foo/bar.jpg/@@images/image/teaser 600w',
      '/foo/bar.jpg/@@images/image/large 800w',
      '/foo/bar.jpg/@@images/image/great 1200w',
      '/foo/bar.jpg/@@images/image/huge 1600w',
    ];
    test('regular', () => {
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg' }).srcSet).toEqual(
        result,
      );
    });
    test('trailing slash', () => {
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg/' }).srcSet).toEqual(
        result,
      );
    });
    test('scaled', () => {
      expect(
        makeSrcSet().fromProps({ src: '/foo/bar.jpg/@@images/image/anyscale' })
          .srcSet,
      ).toEqual(result);
    });
  });

  describe('fromProps generates scr', () => {
    const result = '/foo/bar.jpg/@@images/image/SCALE';
    test('without defaultScale', () => {
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg' }).src).toEqual(
        undefined,
      );
    });

    test('regular', () => {
      expect(
        makeSrcSet().fromProps({ src: '/foo/bar.jpg', defaultScale: 'SCALE' })
          .src,
      ).toEqual(result);
    });
    test('trailing slash', () => {
      expect(
        makeSrcSet().fromProps({ src: '/foo/bar.jpg/', defaultScale: 'SCALE' })
          .src,
      ).toEqual(result);
    });
    test('scaled', () => {
      expect(
        makeSrcSet().fromProps({
          src: '/foo/bar.jpg/@@images/image/anyscale',
          defaultScale: 'SCALE',
        }).src,
      ).toEqual(result);
    });
  });

  test('scales', () => {
    expect(
      makeSrcSet({
        scales: [
          ['large', 800],
          ['great', 1200],
        ],
      }).fromProps({ src: '/foo/bar.jpg' }).srcSet,
    ).toEqual([
      '/foo/bar.jpg/@@images/image/large 800w',
      '/foo/bar.jpg/@@images/image/great 1200w',
    ]);
  });
  test('maxWidth', () => {
    expect(
      makeSrcSet({
        maxWidth: 600,
      }).fromProps({ src: '/foo/bar.jpg' }).srcSet,
    ).toEqual([
      '/foo/bar.jpg/@@images/image/icon 32w',
      '/foo/bar.jpg/@@images/image/tile 64w',
      '/foo/bar.jpg/@@images/image/thumb 128w',
      '/foo/bar.jpg/@@images/image/mini 200w',
      '/foo/bar.jpg/@@images/image/preview 400w',
      '/foo/bar.jpg/@@images/image/teaser 600w',
    ]);
  });
  test('minWidth', () => {
    expect(
      makeSrcSet({
        minWidth: 400,
      }).fromProps({ src: '/foo/bar.jpg' }).srcSet,
    ).toEqual([
      '/foo/bar.jpg/@@images/image/preview 400w',
      '/foo/bar.jpg/@@images/image/teaser 600w',
      '/foo/bar.jpg/@@images/image/large 800w',
      '/foo/bar.jpg/@@images/image/great 1200w',
      '/foo/bar.jpg/@@images/image/huge 1600w',
    ]);
  });
  test('minWidth and maxWidth', () => {
    expect(
      makeSrcSet({
        minWidth: 400,
        maxWidth: 600,
      }).fromProps({ src: '/foo/bar.jpg' }).srcSet,
    ).toEqual([
      '/foo/bar.jpg/@@images/image/preview 400w',
      '/foo/bar.jpg/@@images/image/teaser 600w',
    ]);
  });
  test('enabled', () => {
    expect(
      makeSrcSet({
        enabled: false,
      }).fromProps({ src: '/foo/bar.jpg' }).srcSet,
    ).toBe(undefined);
  });

  describe('@plone/volto/registry config', () => {
    test('scales', () => {
      Object.assign(options, {
        scales: [
          ['large', 800],
          ['great', 1200],
        ],
      });
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg' }).srcSet).toEqual([
        '/foo/bar.jpg/@@images/image/large 800w',
        '/foo/bar.jpg/@@images/image/great 1200w',
      ]);
    });
    test('maxWidth', () => {
      Object.assign(options, {
        maxWidth: 600,
      });
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg' }).srcSet).toEqual([
        '/foo/bar.jpg/@@images/image/icon 32w',
        '/foo/bar.jpg/@@images/image/tile 64w',
        '/foo/bar.jpg/@@images/image/thumb 128w',
        '/foo/bar.jpg/@@images/image/mini 200w',
        '/foo/bar.jpg/@@images/image/preview 400w',
        '/foo/bar.jpg/@@images/image/teaser 600w',
      ]);
    });
    test('minWidth', () => {
      Object.assign(options, {
        minWidth: 400,
      });
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg' }).srcSet).toEqual([
        '/foo/bar.jpg/@@images/image/preview 400w',
        '/foo/bar.jpg/@@images/image/teaser 600w',
        '/foo/bar.jpg/@@images/image/large 800w',
        '/foo/bar.jpg/@@images/image/great 1200w',
        '/foo/bar.jpg/@@images/image/huge 1600w',
      ]);
    });
    test('minWidth and maxWidth', () => {
      Object.assign(options, {
        minWidth: 400,
        maxWidth: 600,
      });
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg' }).srcSet).toEqual([
        '/foo/bar.jpg/@@images/image/preview 400w',
        '/foo/bar.jpg/@@images/image/teaser 600w',
      ]);
    });
    test('enabled', () => {
      Object.assign(options, {
        enabled: false,
      });
      expect(makeSrcSet().fromProps({ src: '/foo/bar.jpg' }).srcSet).toEqual(
        undefined,
      );
    });
  });

  describe('isLocal wrt srcset', () => {
    const result = [
      '/foo/bar.jpg/@@images/image/icon 32w',
      '/foo/bar.jpg/@@images/image/tile 64w',
      '/foo/bar.jpg/@@images/image/thumb 128w',
      '/foo/bar.jpg/@@images/image/mini 200w',
      '/foo/bar.jpg/@@images/image/preview 400w',
      '/foo/bar.jpg/@@images/image/teaser 600w',
      '/foo/bar.jpg/@@images/image/large 800w',
      '/foo/bar.jpg/@@images/image/great 1200w',
      '/foo/bar.jpg/@@images/image/huge 1600w',
    ];
    let isLocalResult;
    let isLocal = jest.fn(() => isLocalResult);
    test('true', () => {
      isLocalResult = true;
      const src = '/foo/bar.jpg';
      expect(makeSrcSet({ isLocal }).fromProps({ src }).srcSet).toEqual(result);
      expect(isLocal).toHaveBeenCalledWith(src);
    });
    test('false', () => {
      isLocalResult = false;
      const src = '/foo/bar.jpg';
      expect(makeSrcSet({ isLocal }).fromProps({ src }).srcSet).toEqual(
        undefined,
      );
      expect(isLocal).toHaveBeenCalledWith(src);
    });
    test('true with enabled=false', () => {
      isLocalResult = true;
      const src = '/foo/bar.jpg';
      expect(
        makeSrcSet({ isLocal, enabled: false }).fromProps({ src }).srcSet,
      ).toEqual(undefined);
      expect(isLocal).not.toHaveBeenCalled();
    });
  });

  describe('isLocal wrt src', () => {
    const result = '/foo/bar.jpg/@@images/image/SCALE';
    let isLocalResult;
    let isLocal = jest.fn(() => isLocalResult);
    test('true', () => {
      isLocalResult = true;
      const src = '/foo/bar.jpg';
      expect(
        makeSrcSet({ isLocal }).fromProps({ src, defaultScale: 'SCALE' }).src,
      ).toEqual(result);
      expect(isLocal).toHaveBeenCalledWith(src);
    });

    test('false wrt src', () => {
      isLocalResult = false;
      const src = '/foo/bar.jpg';
      expect(
        makeSrcSet({ isLocal }).fromProps({ src, defaultScale: 'SCALE' }).src,
      ).toEqual(undefined);
      expect(isLocal).toHaveBeenCalledWith(src);
    });
    test('true with enabled=false wrt src', () => {
      isLocalResult = true;
      const src = '/foo/bar.jpg';
      expect(
        makeSrcSet({ isLocal, enabled: false }).fromProps({ src }).srcSet,
      ).toEqual(undefined);
      expect(isLocal).not.toHaveBeenCalled();
    });
  });

  describe('createScaleUrl', () => {
    const result = [
      '[/foo/bar.jpg-icon] 32w',
      '[/foo/bar.jpg-tile] 64w',
      '[/foo/bar.jpg-thumb] 128w',
      '[/foo/bar.jpg-mini] 200w',
      '[/foo/bar.jpg-preview] 400w',
      '[/foo/bar.jpg-teaser] 600w',
      '[/foo/bar.jpg-large] 800w',
      '[/foo/bar.jpg-great] 1200w',
      '[/foo/bar.jpg-huge] 1600w',
    ];
    let createScaleUrl = jest.fn((url, scaleName) => `[${url}-${scaleName}]`);
    test('works for scrSet', () => {
      const src = '/foo/bar.jpg';
      expect(makeSrcSet({ createScaleUrl }).fromProps({ src }).srcSet).toEqual(
        result,
      );
      expect(createScaleUrl).toHaveBeenCalledTimes(result.length);
    });
    test('works for src', () => {
      const src = '/foo/bar.jpg';
      expect(
        makeSrcSet({ createScaleUrl }).fromProps({ src, defaultScale: 'SCALE' })
          .src,
      ).toEqual('[/foo/bar.jpg-SCALE]');
      expect(createScaleUrl).toHaveBeenCalledTimes(result.length + 1);
    });
  });

  describe('optimizing', () => {
    test('caching default', () => {
      const src = '/foo/bar.jpg';
      const props = makeSrcSet().fromProps({ src });
      const props2 = makeSrcSet().fromProps({ src });
      expect(props2).toEqual(props);
      expect(props2.processedOptions).toBe(props.processedOptions);
    });
    test('full hint object', () => {
      const src = '/foo/bar.jpg';
      const srcSetHints = makeSrcSet();
      const srcSetHints2 = makeSrcSet(srcSetHints);
      expect(srcSetHints.fromProps({ src })).toEqual(
        srcSetHints2.fromProps({ src }),
      );
      expect(srcSetHints.processedOptions).toBe(srcSetHints2.processedOptions);
    });
  });
});
