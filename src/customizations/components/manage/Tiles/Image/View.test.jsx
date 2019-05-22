import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

describe('Image tile View', () => {
  it('renders a view image component', () => {
    const component = renderer.create(<View data={{ url: 'image.jpg' }} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders a view image component detached', () => {
    const component = renderer.create(
      <View detached data={{ url: 'image.jpg' }} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
