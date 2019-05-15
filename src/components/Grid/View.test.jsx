import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

jest.mock('../TileRenderer/TileRenderer', () =>
  jest.fn(() => <div className="thetile" />),
);

test('renders a view image component', () => {
  const component = renderer.create(
    <View
      data={{ columns: [{ id: 'tile', '@type': 'image', image: 'image.jpg' }] }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
