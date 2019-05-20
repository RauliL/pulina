import { mount, shallow } from 'enzyme';
import { defaultTo, noop } from 'lodash';
import * as React from 'react';

import ChannelListItem, { Props } from './ChannelListItem';

describe('<ChannelListItem/>', () => {
  const renderComponent = (props: Partial<Props> = {}) => (
    <ChannelListItem
      name={defaultTo(props.name, '#test-channel')}
      isActive={defaultTo(props.isActive, false)}
      hasUnreadMessages={defaultTo(props.hasUnreadMessages, false)}
      hasUnreadHighlight={defaultTo(props.hasUnreadHighlight, false)}
      onSelect={defaultTo(props.onSelect, noop)}
    />
  );
  const mountComponent = (props: Partial<Props> = {}) => mount(
    renderComponent(props),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderComponent())).toMatchSnapshot();
  });

  it('should render <li/>', () => {
    expect(mountComponent().find('li')).toHaveLength(1);
  });

  it('should render <a/>', () => {
    expect(mountComponent().find('a')).toHaveLength(1);
  });

  it('should render channel name without hash', () => {
    const component = mountComponent();

    expect(component.find('a').find('span').text()).toBe('test-channel');
  });

  it('should invoke callback when channel is being selected', () => {
    const onSelect = jest.fn();
    const component = mountComponent({ onSelect });

    component.find('a').simulate('click');
    expect(onSelect).toBeCalled();
  });
});
