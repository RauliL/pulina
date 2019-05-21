import { mount, shallow } from 'enzyme';
import { defaultTo, noop } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import ChannelList from '../container/ChannelList';
import ChannelUserList from '../container/ChannelUserList';
import MainDisplay from '../container/MainDisplay';
import { State } from '../types/store';

import App, { Props } from './App';

describe('<App/>', () => {
  const mockStore = createMockStore<State>();
  const renderComponent = (props: Partial<Props> = {}) => (
    <Provider store={mockStore()}>
      <App
        channelListVisible={defaultTo(props.channelListVisible, false)}
        userListVisible={defaultTo(props.userListVisible, false)}
        socket={{
          on: noop,
          emit: noop,
          close: noop,
        }}
      />
    </Provider>
  );
  const mountComponent = (props: Partial<Props> = {}) => mount(
    renderComponent(props),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderComponent())).toMatchSnapshot();
  });

  it('should render <ChannelList/>', () => {
    expect(mountComponent().find(ChannelList)).toHaveLength(1);
  });

  it('should render <MainDisplay/>', () => {
    expect(mountComponent().find(MainDisplay)).toHaveLength(1);
  });

  it('should render <ChannelUserList/>', () => {
    expect(mountComponent().find(ChannelUserList)).toHaveLength(1);
  });
});
