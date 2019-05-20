import { mount, shallow } from 'enzyme';
import { defaultTo, noop } from 'lodash';
import * as React from 'react';
import { Button } from 'reactstrap';

import ChannelUserList, { Props } from './ChannelUserList';

describe('<ChannelUserList/>', () => {
  const renderComponent = (props: Partial<Props> = {}) => (
    <ChannelUserList
      channelName={props.channelName}
      users={defaultTo(props.users, [])}
      onToggleUserList={defaultTo(props.onToggleUserList, noop)}
    />
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

  it('should render each user with <li/>', () => {
    const component = mountComponent({
      users: [
        'test-1',
        'test-2',
        'test-3',
      ],
    });

    // It's actually 4 <li/>s because the toggle button is also rendered inside
    // a <li/>.
    expect(component.find('li')).toHaveLength(4);
  });

  it('should render a <Button/>', () => {
    expect(mountComponent().find(Button)).toHaveLength(1);
  });

  it('should invoke callback when <Button/> is being clicked', () => {
    const onToggleUserList = jest.fn();
    const component = mountComponent({ onToggleUserList });

    component.find(Button).simulate('click');
    expect(onToggleUserList).toBeCalled();
  });

  it('should optionally render channel name', () => {
    const component = mountComponent({ channelName: '#test-channel' });

    expect(component.find('li').at(0).text()).toBe('Users on #test-channel');
  });
});
