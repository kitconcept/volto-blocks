import React from 'react';
import renderer from 'react-test-renderer';
import TeaserHeroVariations from './TeaserHeroVariations';

test('renders a teaser hero variations component', () => {
  const component = renderer.create(
    <TeaserHeroVariations
      variation="left"
      onChangeBlock={() => {}}
      data={{
        '@type': 'teaserHero',
        href: '/de/a-page/news1',
        variation: 'left',
        padded: true,
      }}
      block="1c58b5a2-26fb-4112-832b-fad88af1ae0e"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
