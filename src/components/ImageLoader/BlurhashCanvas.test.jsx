import React from 'react';
import { create, act } from 'react-test-renderer';
import BlurhashCanvas from './BlurhashCanvas';
import { decode } from 'blurhash';

let mockDecodeResult;
jest.mock('blurhash', () => {
  return {
    __esModule: true,
    decode: jest.fn((hash, width, height, punch) => mockDecodeResult),
  };
});

let mockImageData = { data: { set: jest.fn(() => {}) } };
let mockContext = {
  createImageData: jest.fn(() => mockImageData),
  putImageData: jest.fn(() => {}),
};
let mockCanvas = {
  getContext: jest.fn(() => mockContext),
};

let mockResizeHandler;
let mockResizeObserver = jest.fn((handler) => {
  mockResizeHandler = handler;
  return {
    observe: jest.fn(() => {}),
    unobserve: jest.fn(() => {}),
  };
});

describe('BlurhashCanvas', () => {
  let origResizeObserver;
  beforeEach(() => {
    jest.clearAllMocks();
    origResizeObserver = window.ResizeObserver;
    window.ResizeObserver = mockResizeObserver;
  });
  afterEach(() => {
    jest.clearAllMocks();
    window.ResizeObserver = origResizeObserver;
  });

  test('renders', () => {
    let component;
    mockDecodeResult = 'PIXELS';
    act(() => {
      component = create(
        <BlurhashCanvas
          hash="HASH"
          ratio={2}
          punch={1}
          width={32}
          height={24}
        />,
        { createNodeMock: () => mockCanvas },
      );
    });
    const canvas = component.toJSON();
    expect(canvas.type).toBe('canvas');
    expect(canvas.children).toBe(null);
    const props = canvas.props;
    expect(props.height).toBe(24);
    expect(props.width).toBe(32);
  });

  describe('paints canvas', () => {
    test('initially', () => {
      let component;
      mockDecodeResult = 'PIXELS';
      act(() => {
        component = create(
          <BlurhashCanvas
            hash="HASH"
            ratio={2}
            punch={1}
            width={32}
            height={24}
          />,
          { createNodeMock: () => mockCanvas },
        );
      });
      const canvas = component.toJSON();
      expect(canvas.type).toBe('canvas');
      expect(canvas.children).toBe(null);
      expect(decode).toBeCalledWith('HASH', 32, 24, 1);
      expect(mockImageData.data.set).toBeCalledWith('PIXELS');
      expect(mockContext.putImageData).toBeCalledWith(mockImageData, 0, 0);
    });

    test('when hash changes', () => {
      let component;
      mockDecodeResult = 'PIXELS';
      act(() => {
        component = create(
          <BlurhashCanvas
            hash="HASH"
            ratio={2}
            punch={1}
            width={32}
            height={24}
          />,
          { createNodeMock: () => mockCanvas },
        );
      });
      mockDecodeResult = 'NEWPIXELS';
      act(() => {
        component.update(
          <BlurhashCanvas
            hash="NEWHASH"
            ratio={2}
            punch={1}
            width={32}
            height={24}
          />,
        );
      });
      const canvas = component.toJSON();
      expect(canvas.type).toBe('canvas');
      expect(canvas.children).toBe(null);
      const props = canvas.props;
      expect(props.height).toBe(24);
      expect(props.width).toBe(32);
      expect(decode).toBeCalledWith('NEWHASH', 32, 24, 1);
      expect(mockImageData.data.set).toBeCalledWith('NEWPIXELS');
      expect(mockContext.putImageData).toBeCalledWith(mockImageData, 0, 0);
    });
  });

  describe('sets height', () => {
    test('initially', () => {
      let component;
      mockCanvas.offsetWidth = 100;
      act(() => {
        component = create(
          <BlurhashCanvas
            hash="HASH"
            ratio={2}
            punch={1}
            width={32}
            height={24}
          />,
          { createNodeMock: () => mockCanvas },
        );
      });
      const canvas = component.toJSON();
      expect(canvas.type).toBe('canvas');
      expect(canvas.children).toBe(null);
      expect(canvas.props.style.height).toBe(50);
    });

    test('updates', () => {
      let component;
      mockCanvas.offsetWidth = 100;
      act(() => {
        component = create(
          <BlurhashCanvas
            hash="HASH"
            ratio={2}
            punch={1}
            width={32}
            height={24}
          />,
          { createNodeMock: () => mockCanvas },
        );
      });
      mockCanvas.offsetWidth = 200;
      act(() => {
        mockResizeHandler();
      });
      const canvas = component.toJSON();
      expect(canvas.type).toBe('canvas');
      expect(canvas.children).toBe(null);
      expect(canvas.props.style.height).toBe(100);
    });
  });
});
