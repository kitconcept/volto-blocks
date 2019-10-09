import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

jest.mock('./TeaserHeroBody', () =>
  jest.fn(() => <div className="theblockbody" />),
);

test('renders a view teaser hero block', () => {
  const component = renderer.create(
    <View
      data={{
        '@type': 'teaserHero',
        href: '/de/a-page/news1',
        variation: 'left',
        padded: true,
      }}
      id="1c58b5a2-26fb-4112-832b-fad88af1ae0e"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
