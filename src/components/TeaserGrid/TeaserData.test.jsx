import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import TeaserData from './TeaserData';

const mockStore = configureStore();

test('renders a Proxy Data Sidebar component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <TeaserData
        id="dcdf1f42-645d-48f6-9531-357bdc2e1881"
        data={{
          '@type': 'teaser',
          href: '/news/a-news-item-that-tells-things',
          id: '2110a241-1389-4cda-8811-77031a540efa',
          index: 0,
        }}
        tile="1234"
        onChangeTile={() => {}}
        openObjectBrowser={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
