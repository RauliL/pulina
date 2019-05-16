import * as React from 'react';

import { Channel } from '../types';

import ChannelListItem from './ChannelListItem';

export interface StateProps {
  channels: Channel[];
  currentChannel?: string;
}

export interface DispatchProps {
  onSelectChannel: (channel: string) => void;
}

export type Props = StateProps & DispatchProps;

const ChannelList: React.SFC<Props> = (props) => (
  <ul className="list-unstyled" style={{ overflowY: 'auto' }}>
    {props.channels.sort().map((channel) => (
      <ChannelListItem
        key={channel.name}
        name={channel.name}
        onSelect={() => props.onSelectChannel(channel.name)}
        isActive={props.currentChannel === channel.name}
        hasUnreadMessages={channel.hasUnreadMessages}
      />
    ))}
  </ul>
);

export default ChannelList;
