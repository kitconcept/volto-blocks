import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import TeaserBody from './TeaserBody';

const mockStore = configureStore();

test('renders a Grid Block Proxy Item component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <TeaserBody
          id="dcdf1f42-645d-48f6-9531-357bdc2e1881"
          data={{
            '@type': 'teaser',
            href: '/news/a-news-item-that-tells-things',
            id: '2110a241-1389-4cda-8811-77031a540efa',
            title: 'The title',
            description: 'The description',
            preview_image: {
              scales: {
                teaser: {
                  download: 'http://localhost:8080/Plone/the-image.jpg',
                },
              },
            },
            index: 0,
          }}
          block="1234"
          onChangeBlock={() => {}}
          openObjectBrowser={() => {}}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
