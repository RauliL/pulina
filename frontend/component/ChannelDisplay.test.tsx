import { mount, shallow } from 'enzyme';
import { defaultTo, noop } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import CommandInput from '../container/CommandInput';
import { mockChannel } from '../mock';
import { State } from '../types/store';

import ChannelDisplay, { Props } from './ChannelDisplay';
import ChannelTitle from './ChannelTitle';
import LogEntryList from './LogEntryList';

describe('<ChannelDisplay/>', () => {
  const mockStore = createMockStore<State>();
  const renderComponent = (props: Partial<Props> = {}) => (
    <Provider store={mockStore()}>
      <ChannelDisplay
        channel={defaultTo(props.channel, mockChannel)}
        onCommand={defaultTo(props.onCommand, noop)}
        onCommandError={defaultTo(props.onCommandError, noop)}
        onToggleChannelList={defaultTo(props.onToggleChannelList, noop)}
        onToggleUserList={defaultTo(props.onToggleUserList, noop)}
      />
    </Provider>
  );
  const mountComponent = (props: Partial<Props> = {}) => mount(
    renderComponent(props),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderComponent())).toMatchSnapshot();
  });

  it('should render <ChannelTitle/>', () => {
    expect(mountComponent().find(ChannelTitle)).toHaveLength(1);
  });

  it('should render <LogEntryList/>', () => {
    expect(mountComponent().find(LogEntryList)).toHaveLength(1);
  });

  it('should render <CommandInput/>', () => {
    expect(mountComponent().find(CommandInput)).toHaveLength(1);
  });
});
