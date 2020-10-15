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
          '@type': 'image',
          href: '/news/a-news-item-that-tells-things',
          id: '2110a241-1389-4cda-8811-77031a540efa',
          index: 0,
        }}
        type="imagesGrid"
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
