import { mount, shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import CommandInputComponent from '../component/CommandInput';
import { mockChannel, mockState } from '../mock';
import { State, Store } from '../types/store';

import CommandInput from './CommandInput';

describe('<CommandInput/> container', () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) => (
    <Provider store={store}>
      <CommandInput
        currentChannel={mockChannel}
        onCommand={noop}
        onCommandError={noop}
      />
    </Provider>
  );
  const mountContainer = (store: Store = mockStore()) => mount(
    renderContainer(store),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderContainer()));
  });

  it('should read `nick` from Redux state', () => {
    const store = mockStore({
      ...mockState,
      nick: 'test',
    });
    const container = mountContainer(store);
    const component = container.find(CommandInputComponent);

    expect(component.prop('nick')).toBe('test');
  });

  it('should read `users` from Redux state', () => {
    const store = mockStore({
      ...mockState,
      channels: {
        [mockChannel.name]: {
          ...mockChannel,
          users: ['foo', 'bar'],
        },
      },
      currentChannel: mockChannel.name,
    });
    const container = mountContainer(store);
    const component = container.find(CommandInputComponent);

    expect(component.prop('users')).toEqual(['foo', 'bar']);
  });

  it('should work even when there is no current channel', () => {
    const store = mockStore({
      ...mockState,
      currentChannel: undefined,
    });
    const container = mountContainer(store);
    const component = container.find(CommandInputComponent);

    expect(component.prop('users')).toBeUndefined();
  });
});
