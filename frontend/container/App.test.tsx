import { shallow, mount } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import AppComponent from '../component/App';
import { mockState } from '../mock';
import { State, Store } from '../types/store';

import App from './App';

describe('<App/> container', () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) => (
    <Provider store={store}>
      <App
        socket={{
          on: noop,
          emit: noop,
          close: noop,
        }}
      />
    </Provider>
  );
  const mountContainer = (store: Store = mockStore()) => mount(
    renderContainer(store),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderContainer())).toMatchSnapshot();
  });

  it.each([
    [true],
    [false],
  ])(
    'should read value of `channelListVisible` from Redux state',
    (channelListVisible) => {
      const store = mockStore({
        ...mockState,
        channelListVisible,
      });
      const container = mountContainer(store);
      const component = container.find(AppComponent);

      expect(component.prop('channelListVisible')).toBe(channelListVisible);
    },
  );

  it.each([
    [true],
    [false],
  ])(
    'should read value of `userListVisible` from Redux state',
    (userListVisible) => {
      const store = mockStore({
        ...mockState,
        userListVisible,
      });
      const container = mountContainer(store);
      const component = container.find(AppComponent);

      expect(component.prop('userListVisible')).toBe(userListVisible);
    },
  );
});
