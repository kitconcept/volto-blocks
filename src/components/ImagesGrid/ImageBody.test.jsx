import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ImageBody from './ImageBody';

const mockStore = configureStore();

test('renders a Grid Tile Proxy Item component', () => {
  const store = mockStore({
    router: {
      location: {
        pathname: '/blah',
      },
    },
    content: {
      create: {
        loading: false,
        loaded: true,
      },
      data: {
        title: 'the title',
        description: 'the description',
        image: { download: 'http://image' },
        '@id': 'http://theitem',
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
        <ImageBody
          id="dcdf1f42-645d-48f6-9531-357bdc2e1881"
          data={{
            '@type': 'image',
            href: '/news/a-news-item-that-tells-things',
            id: '2110a241-1389-4cda-8811-77031a540efa',
            index: 0,
          }}
          tile="1234"
          onChangeTile={() => {}}
          openObjectBrowser={() => {}}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
