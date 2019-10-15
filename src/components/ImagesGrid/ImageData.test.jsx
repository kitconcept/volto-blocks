import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ImageData from './ImageData';

const mockStore = configureStore();

test('renders an Image Data Sidebar component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <ImageData
        id="dcdf1f42-645d-48f6-9531-357bdc2e1881"
        data={{
          '@type': 'imagesGrid',
          columns: [
            {
              '@type': 'image',
              href: '/news/a-news-item-that-tells-things',
              id: '2110a241-1389-4cda-8811-77031a540efa',
              index: 0,
            },
            {
              '@type': 'image',
              href: '/news/another-news-item',
              id: '3ccd6338-4d13-4f22-a68c-14b6b60cf860',
              index: 1,
            },
            {
              '@type': 'image',
              id: '2ac3b8d1-3ea8-4d78-a4ce-b2997a961c5e',
            },
            {
              '@type': 'image',
              id: 'e947b1e5-b9b1-4fc1-acf3-cb04f78a3574',
            },
          ],
        }}
        type="imagesGrid"
        tile="1234"
        pathname="/news"
        onChangeTile={() => {}}
        openObjectBrowser={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
