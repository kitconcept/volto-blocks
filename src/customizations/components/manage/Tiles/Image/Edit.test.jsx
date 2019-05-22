import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

const mockStore = configureStore();

describe('Image tile Edit', () => {
  it('renders an edit image tile component', () => {
    const store = mockStore({
      router: {
        location: {
          pathname: '/bla/ble',
        },
      },
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
        <Edit
          data={{ url: 'image' }}
          selected={false}
          tile="1234"
          content={{}}
          request={{
            loading: false,
            loaded: false,
          }}
          pathname="/news"
          onChangeTile={() => {}}
          onSelectTile={() => {}}
          onDeleteTile={() => {}}
          createContent={() => {}}
          onFocusPreviousTile={() => {}}
          onFocusNextTile={() => {}}
          handleKeyDown={() => {}}
          index={1}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders an edit image tile component detached', () => {
    const store = mockStore({
      router: {
        location: {
          pathname: '/bla/ble',
        },
      },
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
        <Edit
          data={{ url: 'image' }}
          selected={false}
          tile="1234"
          content={{}}
          request={{
            loading: false,
            loaded: false,
          }}
          pathname="/news"
          onChangeTile={() => {}}
          onSelectTile={() => {}}
          onDeleteTile={() => {}}
          createContent={() => {}}
          onFocusPreviousTile={() => {}}
          onFocusNextTile={() => {}}
          handleKeyDown={() => {}}
          index={1}
          detached
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
