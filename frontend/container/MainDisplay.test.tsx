import { mount, shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import { onChannelError, toggleChannelList, toggleUserList } from '../action';
import ChannelTitle from '../component/ChannelTitle';
import CommandInput from '../component/CommandInput';
import MainDisplayComponent from '../component/MainDisplay';
import { mockChannel, mockState } from '../mock';
import { State, Store } from '../types/store';

import MainDisplay from './MainDisplay';

describe('<MainDisplay/> container', () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) => (
    <Provider store={store}>
      <MainDisplay onCommand={noop}/>
    </Provider>
  );
  const mountContainer = (store: Store = mockStore()) => mount(
    renderContainer(store),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderContainer())).toMatchSnapshot();
  });

  it.each(['test', undefined])(
    'should read value of `isNickRegistered` from Redux store',
    (nick) => {
      const store = mockStore({ ...mockState, nick });
      const container = mountContainer(store);
      const component = container.find(MainDisplayComponent);

      expect(component.prop('isNickRegistered')).toBe(nick != null);
    },
  );

  it('should read value of `currentChannel` from Redux store', () => {
    const store = mockStore({
      ...mockState,
      currentChannel: mockChannel.name,
      channels: { [mockChannel.name]: mockChannel },
    });
    const container = mountContainer(store);
    const component = container.find(MainDisplayComponent);

    expect(component.prop('currentChannel')).toEqual(mockChannel);
  });

  it('should dispatch Redux action on command error', () => {
    const store = mockStore({
      ...mockState,
      nick: 'test',
      currentChannel: mockChannel.name,
      channels: { [mockChannel.name]: mockChannel },
    });
    const container = mountContainer(store);

    container.find(CommandInput).prop('onCommandError')('Test');
    expect(store.getActions()).toEqual([
      {
        type: onChannelError.type,
        payload: 'Test',
      },
    ]);
  });

  it('should dispatch Redux action on channel list toggle', () => {
    const store = mockStore({
      ...mockState,
      nick: 'test',
      currentChannel: mockChannel.name,
      channels: { [mockChannel.name]: mockChannel },
    });
    const container = mountContainer(store);

    container.find(ChannelTitle).prop('onToggleChannelList')();
    expect(store.getActions()).toEqual([
      {
        type: toggleChannelList.type,
        payload: undefined,
      },
    ]);
  });

  it('should dispatch Redux action on user list toggle', () => {
    const store = mockStore({
      ...mockState,
      nick: 'test',
      currentChannel: mockChannel.name,
      channels: { [mockChannel.name]: mockChannel },
    });
    const container = mountContainer(store);

    container.find(ChannelTitle).prop('onToggleUserList')();
    expect(store.getActions()).toEqual([
      {
        type: toggleUserList.type,
        payload: undefined,
      },
    ]);
  });
});
