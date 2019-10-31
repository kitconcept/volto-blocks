import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import GridSidebar from './GridSidebar';

const mockStore = configureStore();

test('renders a Grid Block Sidebar component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <GridSidebar
        id="dcdf1f42-645d-48f6-9531-357bdc2e1881"
        data={{
          '@type': 'teaserGrid',
          columns: [
            {
              '@type': 'teaser',
              href: '/news/a-news-item-that-tells-things',
              id: '2110a241-1389-4cda-8811-77031a540efa',
              index: 0,
            },
            {
              '@type': 'teaser',
              href: '/news/another-news-item',
              id: '3ccd6338-4d13-4f22-a68c-14b6b60cf860',
              index: 1,
            },
            {
              '@type': 'teaser',
              id: '2ac3b8d1-3ea8-4d78-a4ce-b2997a961c5e',
            },
            {
              '@type': 'teaser',
              id: 'e947b1e5-b9b1-4fc1-acf3-cb04f78a3574',
            },
          ],
        }}
        type="teaserGrid"
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
        sidebarData={() => <div />}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
