import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

jest.mock('./ListingItem', () => jest.fn(() => <div className="thetile" />));

test('renders a view image component for the listing tile', () => {
  const component = renderer.create(
    <View
      data={{
        '@type': 'listing',
        query: [
          {
            i: 'review_state',
            o: 'plone.app.querystring.operation.selection.any',
            v: ['private'],
          },
        ],
      }}
      properties={{ is_folderish: true }}
      tile="123u12u3"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
