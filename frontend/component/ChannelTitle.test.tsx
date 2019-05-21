import { mount, shallow } from 'enzyme';
import { defaultTo, noop } from 'lodash';
import * as React from 'react';
import { Button, Navbar } from 'reactstrap';

import { mockChannel } from '../mock';

import ChannelTitle, { Props } from './ChannelTitle';

describe('<ChannelTitle/>', () => {
  const renderComponent = (props: Partial<Props> = {}) => (
    <ChannelTitle
      channel={defaultTo(props.channel, mockChannel)}
      onToggleChannelList={defaultTo(props.onToggleChannelList, noop)}
      onToggleUserList={defaultTo(props.onToggleUserList, noop)}
    />
  );
  const mountComponent = (props: Partial<Props> = {}) => mount(
    renderComponent(props),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderComponent())).toMatchSnapshot();
  });

  it('should render <Navbar/>', () => {
    expect(mountComponent().find(Navbar)).toHaveLength(1);
  });

  it('should render the channel name', () => {
    const component = mountComponent();

    expect(component.find('.navbar-brand').text()).toBe(mockChannel.name);
  });

  it('should render two <Button/>s', () => {
    expect(mountComponent().find(Button)).toHaveLength(2);
  });

  it('should invoke callback when channel list button is clicked', () => {
    const onToggleChannelList = jest.fn();
    const component = mountComponent({ onToggleChannelList });

    component.find('.btn-toggle-channel-list').hostNodes().simulate('click');
    expect(onToggleChannelList).toBeCalled();
  });

  it('should invoke callback when user list button is clicked', () => {
    const onToggleUserList = jest.fn();
    const component = mountComponent({ onToggleUserList });

    component.find('.btn-toggle-user-list').hostNodes().simulate('click');
    expect(onToggleUserList).toBeCalled();
  });
});
