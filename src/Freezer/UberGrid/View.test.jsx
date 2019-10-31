import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

jest.mock('../../components/BlockRenderer/BlockRenderer', () =>
  jest.fn(() => <div className="theblock" />),
);

test('renders a view image component', () => {
  const component = renderer.create(
    <View
      data={{ columns: [{ id: 'block', '@type': 'image', image: 'image.jpg' }] }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
