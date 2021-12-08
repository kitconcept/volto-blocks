import React from 'react';
import { create, act } from 'react-test-renderer';
import AnyLoader from './AnyLoader';

export const describeAnyLoader = ({ Component, expectComponent }) => {
  test('shows placeholder, then shows loaded image', () => {
    const component = create(
      <Component
        src="http://foo.bar/image"
        alt="DESCRIPTION"
        placeholder={
          <>
            <div foo1="bar1" />
            <div foo2="bar2" />
          </>
        }
      ></Component>,
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
    });
  });

  test('shows placeholder single child, then shows loaded image', () => {
    const component = create(
      <Component
        src="http://foo.bar/image"
        alt="DESCRIPTION"
        placeholder={<div foo1="bar1" />}
      ></Component>,
    );
    const loading = component.toJSON();
    expect(loading.length).toBe(2);
    expect(loading[0].props.style.display).toBe('none');
    expect(loading[1].props.foo1).toBe('bar1');
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
    });
  });

  describe('shows placeholder if src is missing', () => {
    const testWithSrc = (src) => {
      const component = create(
        <Component
          src={src}
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Component>,
      );
      const placeholder = component.toJSON();
      expect(placeholder.length).toBe(3);
      expect(placeholder[0].props.style.display).toBe('none');
      expect(placeholder[1].props.foo1).toBe('bar1');
      expect(placeholder[2].props.foo2).toBe('bar2');
      expect(placeholder[0].children).toBe(null);
    };

    test('null string', () => {
      testWithSrc('');
    });

    test('null', () => {
      testWithSrc(null);
    });

    test('undefined or missing', () => {
      testWithSrc(undefined);
    });

    test('false', () => {
      testWithSrc(false);
    });
  });

  describe('can update src', () => {
    test('from placeholder', () => {
      const component = create(
        <Component
          src=""
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Component>,
      );
      const placeholder = component.toJSON();
      expect(placeholder.length).toBe(3);
      expect(placeholder[0].props.style.display).toBe('none');
      expect(placeholder[1].props.foo1).toBe('bar1');
      expect(placeholder[2].props.foo2).toBe('bar2');
      expect(placeholder[0].children).toBe(null);
      act(() => {
        component.update(
          <Component
            src="http://foo.bar/image"
            alt="DESCRIPTION"
            placeholder={
              <>
                <div foo1="bar1" />
                <div foo2="bar2" />
              </>
            }
          ></Component>,
        );
      });
      const loading = component.toJSON();
      expect(loading.length).toBe(3);
      expect(loading[0].props.style.display).toBe('none');
      expect(loading[1].props.foo1).toBe('bar1');
      expect(loading[2].props.foo2).toBe('bar2');
      expect(loading[0].children.length).toBe(1);
      const img = loading[0].children[0];
      expect(img.props.src).toBe('http://foo.bar/image');
      expect(img.props.alt).toBe('DESCRIPTION');
      expect('children' in img.props).toBe(false);
      expect(img.children).toBe(null);
      act(() => {
        img.props.onLoad();
      });
      const loaded = component.toJSON();
      expectComponent(loaded, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
      });
    });

    test('from other src', () => {
      const component = create(
        <Component
          src="http://foo.bar/image1"
          alt="DESCRIPTION1"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Component>,
      );
      const loading = component.toJSON();
      expect(loading.length).toBe(3);
      expect(loading[0].props.style.display).toBe('none');
      expect(loading[1].props.foo1).toBe('bar1');
      expect(loading[2].props.foo2).toBe('bar2');
      expect(loading[0].children.length).toBe(1);
      const img = loading[0].children[0];
      expect(img.type).toBe('img');
      expect(img.props.src).toBe('http://foo.bar/image1');
      expect(img.props.alt).toBe('DESCRIPTION1');
      expect('children' in img.props).toBe(false);
      expect(img.children).toBe(null);
      act(() => {
        img.props.onLoad();
      });
      const loaded1 = component.toJSON();
      expectComponent(loaded1, {
        src: 'http://foo.bar/image1',
        alt: 'DESCRIPTION1',
      });
      act(() => {
        component.update(
          <Component
            src="http://foo.bar/image2"
            alt="DESCRIPTION2"
            placeholder={
              <>
                <div foo1="bar1" />
                <div foo2="bar2" />
              </>
            }
          ></Component>,
        );
      });
      const updating = component.toJSON();
      expect(updating.length).toBe(2);
      expect(updating[0].props.style.display).toBe('none');
      expect(updating[1].type).toBe('img');
      expect(updating[1].props.src).toBe('http://foo.bar/image1');
      expect(updating[1].props.alt).toBe('DESCRIPTION1');
      expect(updating[0].children.length).toBe(1);
      const img2 = updating[0].children[0];
      expect(img2.props.src).toBe('http://foo.bar/image2');
      expect(img2.props.alt).toBe('DESCRIPTION2');
      expect('children' in img2.props).toBe(false);
      expect(img2.children).toBe(null);
      act(() => {
        img2.props.onLoad();
      });
      const loaded2 = component.toJSON();
      expectComponent(loaded2, {
        src: 'http://foo.bar/image2',
        alt: 'DESCRIPTION2',
      });
    });
  });

  describe('can update other props than src', () => {
    test('from placeholder', () => {
      const component = create(
        <Component
          src=""
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Component>,
      );
      const placeholder = component.toJSON();
      expect(placeholder.length).toBe(3);
      expect(placeholder[0].props.style.display).toBe('none');
      expect(placeholder[1].props.foo1).toBe('bar1');
      expect(placeholder[2].props.foo2).toBe('bar2');
      expect(placeholder[0].children).toBe(null);
      act(() => {
        component.update(
          <Component
            src=""
            alt="DESCRIPTION2"
            placeholder={
              <>
                <div foo1="bar1" />
                <div foo2="bar2" />
              </>
            }
          ></Component>,
        );
      });
      const placeholder2 = component.toJSON();
      expect(placeholder2.length).toBe(3);
      expect(placeholder2[0].props.style.display).toBe('none');
      expect(placeholder2[1].props.foo1).toBe('bar1');
      expect(placeholder2[2].props.foo2).toBe('bar2');
      expect(placeholder2[0].children).toBe(null);
    });

    test('from other src', () => {
      const component = create(
        <Component
          src="http://foo.bar/image1"
          alt="DESCRIPTION1"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Component>,
      );
      const loading = component.toJSON();
      expect(loading.length).toBe(3);
      expect(loading[0].props.style.display).toBe('none');
      expect(loading[1].props.foo1).toBe('bar1');
      expect(loading[2].props.foo2).toBe('bar2');
      expect(loading[0].children.length).toBe(1);
      const img = loading[0].children[0];
      expect(img.type).toBe('img');
      expect(img.props.src).toBe('http://foo.bar/image1');
      expect(img.props.alt).toBe('DESCRIPTION1');
      expect('children' in img.props).toBe(false);
      expect(img.children).toBe(null);
      act(() => {
        img.props.onLoad();
      });
      const loaded1 = component.toJSON();
      expectComponent(loaded1, {
        src: 'http://foo.bar/image1',
        alt: 'DESCRIPTION1',
      });
      act(() => {
        component.update(
          <Component
            src="http://foo.bar/image1"
            alt="DESCRIPTION2"
            placeholder={
              <>
                <div foo1="bar1" />
                <div foo2="bar2" />
              </>
            }
          ></Component>,
        );
      });
      const loaded2 = component.toJSON();
      expectComponent(loaded2, {
        src: 'http://foo.bar/image1',
        alt: 'DESCRIPTION2',
      });
    });
  });

  describe('can update placeholder', () => {
    test('from placeholder, update becomes visible', () => {
      const component = create(
        <Component
          src=""
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Component>,
      );
      const placeholder = component.toJSON();
      expect(placeholder.length).toBe(3);
      expect(placeholder[0].props.style.display).toBe('none');
      expect(placeholder[1].props.foo1).toBe('bar1');
      expect(placeholder[2].props.foo2).toBe('bar2');
      expect(placeholder[0].children).toBe(null);
      act(() => {
        component.update(
          <Component
            src=""
            alt="DESCRIPTION"
            placeholder={
              <>
                <div foo3="bar3" />
                <div foo4="bar4" />
              </>
            }
          ></Component>,
        );
      });
      const placeholder2 = component.toJSON();
      expect(placeholder2.length).toBe(3);
      expect(placeholder2[0].props.style.display).toBe('none');
      expect(placeholder2[1].props.foo3).toBe('bar3');
      expect(placeholder2[2].props.foo4).toBe('bar4');
      expect(placeholder2[0].children).toBe(null);
    });

    test('from other src, no change', () => {
      const component = create(
        <Component
          src="http://foo.bar/image"
          alt="DESCRIPTION"
          placeholder={
            <>
              <div foo1="bar1" />
              <div foo2="bar2" />
            </>
          }
        ></Component>,
      );
      const loading = component.toJSON();
      expect(loading.length).toBe(3);
      expect(loading[0].props.style.display).toBe('none');
      expect(loading[1].props.foo1).toBe('bar1');
      expect(loading[2].props.foo2).toBe('bar2');
      expect(loading[0].children.length).toBe(1);
      const img = loading[0].children[0];
      expect(img.type).toBe('img');
      expect(img.props.src).toBe('http://foo.bar/image');
      expect(img.props.alt).toBe('DESCRIPTION');
      expect('children' in img.props).toBe(false);
      expect(img.children).toBe(null);
      act(() => {
        img.props.onLoad();
      });
      const loaded1 = component.toJSON();
      expectComponent(loaded1, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
      });
      act(() => {
        component.update(
          <Component
            src="http://foo.bar/image"
            alt="DESCRIPTION"
            placeholder={
              <>
                <div foo3="bar3" />
                <div foo4="bar4" />
              </>
            }
          ></Component>,
        );
      });
      const loaded2 = component.toJSON();
      expectComponent(loaded2, {
        src: 'http://foo.bar/image',
        alt: 'DESCRIPTION',
      });
    });
  });
};

describe('AnyLoader', () => {
  describeAnyLoader({
    Component: (props) =>
      AnyLoader({
        ...props,
        createComponent: (props, children) =>
          React.createElement('img', props, children),
      }),
    expectComponent: (img, props) => {
      expect(img.type).toBe('img');
      for (const k in props) {
        expect(img.props[k]).toBe(props[k]);
      }
      expect('children' in img.props).toBe(false);
      expect(img.children).toBe(null);
    },
  });
});
