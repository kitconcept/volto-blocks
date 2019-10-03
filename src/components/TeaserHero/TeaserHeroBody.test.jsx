import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import TeaserHeroBody from './TeaserHeroBody';

const mockStore = configureStore();

test('renders a Grid Tile Proxy Item component', () => {
  const store = mockStore({
    content: {
      subrequests: {
        '1c58b5a2-26fb-4112-832b-fad88af1ae0e': {
          data: {
            title: 'the title',
            description: 'the description',
            image: { download: 'http://image' },
            '@id': 'http://theitem',
          },
        },
      },
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <TeaserHeroBody
          id="1c58b5a2-26fb-4112-832b-fad88af1ae0e"
          data={{
            '@type': 'teaserHero',
            href: '/de/a-page/news1',
            variation: 'left',
            padded: true,
          }}
          tile="1c58b5a2-26fb-4112-832b-fad88af1ae0e"
          onChangeTile={() => {}}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
