import { mount, shallow } from 'enzyme';
import { defaultTo, noop } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Button } from 'reactstrap';
import createMockStore from 'redux-mock-store';

import { mockChannel } from '../mock';
import { State } from '../types/store';

import ChannelList, { Props } from './ChannelList';
import ChannelListItem from './ChannelListItem';

describe('<ChannelList/>', () => {
  const mockStore = createMockStore<State>();
  const renderComponent = (props: Partial<Props> = {}) => (
    <Provider store={mockStore()}>
      <ChannelList
        channels={defaultTo(props.channels, [])}
        currentChannel={props.currentChannel}
        onSelectChannel={defaultTo(props.onSelectChannel, noop)}
        onToggleChannelList={defaultTo(props.onToggleChannelList, noop)}
      />
    </Provider>
  );
  const mountComponent = (props: Partial<Props> = {}) => mount(
    renderComponent(props),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderComponent())).toMatchSnapshot();
  });

  it('should render <ul/>', () => {
    expect(mountComponent().find('ul')).toHaveLength(1);
  });

  it('should render <Button/>', () => {
    expect(mountComponent().find(Button)).toHaveLength(1);
  });

  it('should invoke callback when the button is being clicked', () => {
    const onToggleChannelList = jest.fn();
    const component = mountComponent({ onToggleChannelList });

    component.find(Button).simulate('click');
    expect(onToggleChannelList).toBeCalled();
  });

  it('should render each channel with <ChannelListItem/>', () => {
    const component = mountComponent({
      channels: [
        {
          ...mockChannel,
          name: '#channel1',
        },
        {
          ...mockChannel,
          name: '#channel2',
        },
        {
          ...mockChannel,
          name: '#channel3',
        },
      ],
    });

    expect(component.find(ChannelListItem)).toHaveLength(3);
  });

  it('should invoke callback when channel is selected', () => {
    const onSelectChannel = jest.fn();
    const component = mountComponent({
      channels: [mockChannel],
      onSelectChannel,
    });

    component.find(ChannelListItem).at(0).prop('onSelect')();
    expect(onSelectChannel).toBeCalledWith(mockChannel.name);
  });
});
