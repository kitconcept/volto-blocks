import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

jest.mock('./ProxyItem', () => jest.fn(() => <div className="thetile" />));

test('renders a view image component', () => {
  const component = renderer.create(
    <View
      data={{
        '@type': 'imagesGrid',
        columns: [
          {
            '@type': 'proxy',
            href: '/news/a-news-item-that-tells-things',
            id: '2110a241-1389-4cda-8811-77031a540efa',
            index: 0,
          },
          {
            '@type': 'proxy',
            href: '/news/another-news-item',
            id: '3ccd6338-4d13-4f22-a68c-14b6b60cf860',
            index: 1,
          },
          {
            '@type': 'proxy',
            id: '2ac3b8d1-3ea8-4d78-a4ce-b2997a961c5e',
          },
          {
            '@type': 'proxy',
            id: 'e947b1e5-b9b1-4fc1-acf3-cb04f78a3574',
          },
        ],
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
