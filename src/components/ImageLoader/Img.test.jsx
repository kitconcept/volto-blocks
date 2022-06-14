import React from 'react';
import { create, act } from 'react-test-renderer';
import Img from './Img';
import { describeAnyLoader } from './AnyLoader.test';
import config from '@plone/volto/registry';
import makeSrcSet from './makeSrcSet';

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

describe('Img', () => {
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

  const expectComponent = (img, props) => {
    expect(img.type).toBe('img');
    for (const k in props) {
      expect(img.props[k]).toEqual(props[k]);
    }
  };

  describeAnyLoader({
    Component: Img,
    expectComponent,
  });

  test('Not allowed to have children', () => {
    spyOn(console, 'error');
    expect(() =>
      create(
        <Img
          src="http://foo.bar/image"
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        >
          <div fooC="barC" />
        </Img>,
      ),
    ).toThrow('Children are not allowed in <Img>');
  });

  describe('renders srcSet', () => {
    test('from options', () => {
      const component = create(
        <Img
          src="http://foo.bar/image"
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
          srcSetHints={{
            minWidth: 600,
            maxWidth: 800,
          }}
        ></Img>,
      );
      const loading = component.toJSON();
      expect(loading.length).toBe(3);
      expect(loading[0].props.style.display).toBe('none');
      expect(loading[1].props.foo1).toBe('bar1');
      expect(loading[2].props.foo2).toBe('bar2');
      expect(loading[0].children.length).toBe(1);
      const img = loading[0].children[0];
      expectComponent(img, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
      });
      act(() => {
        img.props.onLoad();
      });
      const loaded = component.toJSON();
      expectComponent(loaded, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
        srcSet: [
          'http://foo.bar/image/@@images/image/teaser 600w',
          'http://foo.bar/image/@@images/image/large 800w',
        ],
      });
    });

    test('from object', () => {
      const srcSetHints = makeSrcSet({
        minWidth: 600,
        maxWidth: 800,
      });
      const component = create(
        <Img
          src="http://foo.bar/image"
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
          srcSetHints={srcSetHints}
        ></Img>,
      );
      const loading = component.toJSON();
      expect(loading.length).toBe(3);
      expect(loading[0].props.style.display).toBe('none');
      expect(loading[1].props.foo1).toBe('bar1');
      expect(loading[2].props.foo2).toBe('bar2');
      expect(loading[0].children.length).toBe(1);
      const img = loading[0].children[0];
      expectComponent(img, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
      });
      act(() => {
        img.props.onLoad();
      });
      const loaded = component.toJSON();
      expectComponent(loaded, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
        srcSet: [
          'http://foo.bar/image/@@images/image/teaser 600w',
          'http://foo.bar/image/@@images/image/large 800w',
        ],
      });
    });

    test('from default', () => {
      const component = create(
        <Img
          src="http://foo.bar/image"
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Img>,
      );
      const loading = component.toJSON();
      expect(loading.length).toBe(3);
      expect(loading[0].props.style.display).toBe('none');
      expect(loading[1].props.foo1).toBe('bar1');
      expect(loading[2].props.foo2).toBe('bar2');
      expect(loading[0].children.length).toBe(1);
      const img = loading[0].children[0];
      expectComponent(img, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
      });
      act(() => {
        img.props.onLoad();
      });
      const loaded = component.toJSON();
      expectComponent(loaded, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
        srcSet: [
          'http://foo.bar/image/@@images/image/icon 32w',
          'http://foo.bar/image/@@images/image/tile 64w',
          'http://foo.bar/image/@@images/image/thumb 128w',
          'http://foo.bar/image/@@images/image/mini 200w',
          'http://foo.bar/image/@@images/image/preview 400w',
          'http://foo.bar/image/@@images/image/teaser 600w',
          'http://foo.bar/image/@@images/image/large 800w',
          'http://foo.bar/image/@@images/image/great 1200w',
          'http://foo.bar/image/@@images/image/huge 1600w',
        ],
      });
    });
  });
});
