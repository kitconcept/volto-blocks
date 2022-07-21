import makeBlurhash from './makeBlurhash';
import config from '@plone/volto/registry';
import { create } from 'react-test-renderer';

jest.mock('./BlurhashCanvas', () => ({
  __esModule: true,
  default: jest.fn((props) => <div {...props} />),
}));

describe('makeBlurhash', () => {
  let options;
  let origBlurhashOptions;

  beforeEach(() => {
    jest.clearAllMocks();
    options = {};
    origBlurhashOptions = config.settings.blurhashOptions;
    config.settings.blurhashOptions = options;
  });

  afterEach(() => {
    config.settings.blurhashOptions = origBlurhashOptions;
  });

  const expectProps = (el, type, props) => {
    const component = create(el);
    const json = component.toJSON();
    expect(json.type).toEqual(type);
    expect(json.props).toEqual(props);
  };

  describe('renders canvas as placeholder', () => {
    test('regular', () => {
      const result = makeBlurhash().fromProps({ blurhash: '1:BLURHASH' });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 1,
        width: 32,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('placeholder', () => {
      const result = makeBlurhash().fromProps({
        placeholder: <img alt="ALT" />,
      });
      expect(result.hasOwnProperty('blurhash')).toBe(false);
      expect(result.hasOwnProperty('placeholder')).toBe(false);
    });
    test('placeholder override throws error', () => {
      const o = makeBlurhash();
      expect(() =>
        o.fromProps({
          blurhash: '1:BLURHASH',
          placeholder: <img alt="ALT" />,
        }),
      ).toThrow('blurhash and placeholder properties cannot both be specified');
    });
  });

  describe('options', () => {
    test('resolutionX', () => {
      const result = makeBlurhash({ resolutionX: 64 }).fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 1,
        width: 64,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('resolutionY', () => {
      const result = makeBlurhash({ resolutionY: 64 }).fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 1,
        width: 32,
        height: 64,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('punch', () => {
      const result = makeBlurhash({ punch: 4 }).fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 4,
        width: 32,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('style', () => {
      const result = makeBlurhash({
        style: { width: '100%', color: 'blue' },
      }).fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 1,
        width: 32,
        height: 32,
        style: { width: '100%', color: 'blue' },
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
  });

  describe('hash and ratio', () => {
    test('regular', () => {
      const result = makeBlurhash().fromProps({ blurhash: '2:BLURHASH' });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 2,
        punch: 1,
        width: 32,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('fraction', () => {
      const result = makeBlurhash().fromProps({ blurhash: '0.5:BLURHASH' });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 0.5,
        punch: 1,
        width: 32,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('comma in blurhash works', () => {
      const result = makeBlurhash().fromProps({ blurhash: '1:BLURHASH:MORE' });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH:MORE',
        ratio: 1,
        punch: 1,
        width: 32,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
  });

  describe('@plone/volto/registry config', () => {
    test('resolutionX', () => {
      Object.assign(options, { resolutionX: 64 });
      const result = makeBlurhash().fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 1,
        width: 64,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('resolutionY', () => {
      Object.assign(options, { resolutionY: 64 });
      const result = makeBlurhash().fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 1,
        width: 32,
        height: 64,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('punch', () => {
      Object.assign(options, { punch: 4 });
      const result = makeBlurhash().fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 4,
        width: 32,
        height: 32,
        style: {},
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
    test('style', () => {
      Object.assign(options, { style: { width: '100%', color: 'blue' } });
      const result = makeBlurhash({}).fromProps({
        blurhash: '1:BLURHASH',
      });
      expectProps(result.placeholder, 'div', {
        hash: 'BLURHASH',
        ratio: 1,
        punch: 1,
        width: 32,
        height: 32,
        style: { width: '100%', color: 'blue' },
      });
      expect(result.hasOwnProperty('blurhash')).toBe(true);
      expect(result.blurhash).toBe(undefined);
    });
  });
});
