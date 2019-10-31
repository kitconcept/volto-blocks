import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import TeaserHeroData from './TeaserHeroData';

const mockStore = configureStore();

test('renders an Listing Data Sidebar component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <TeaserHeroData
        id="1c58b5a2-26fb-4112-832b-fad88af1ae0e"
        data={{
          '@type': 'teaserHero',
          href: '/de/a-page/news1',
          variation: 'left',
          padded: true,
        }}
        block="1c58b5a2-26fb-4112-832b-fad88af1ae0e"
        pathname="/news"
        onChangeBlock={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
