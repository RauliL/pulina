import * as React from 'react';
import { Button } from 'reactstrap';

import { Channel } from '../types/channel';

import ChannelListItem from './ChannelListItem';

export interface StateProps {
  channels: Channel[];
  currentChannel?: string;
}

export interface DispatchProps {
  onSelectChannel: (channel: string) => void;
  onToggleChannelList: () => void;
}

export type Props = StateProps & DispatchProps;

const ChannelList: React.SFC<Props> = (props) => (
  <ul className="list-unstyled">
    <li className="d-lg-none navbar bg-white text-body border-bottom">
      <span className="navbar-brand">Channels</span>
      <div className="float-right">
        <Button outline={true} onClick={props.onToggleChannelList}>
          <i className="fas fa-times"/>
        </Button>
      </div>
    </li>
    {props.channels.map((channel) => (
      <ChannelListItem
        key={channel.name}
        name={channel.name}
        onSelect={() => props.onSelectChannel(channel.name)}
        isActive={props.currentChannel === channel.name}
        hasUnreadMessages={channel.hasUnreadMessages}
        hasUnreadHighlight={channel.hasUnreadHighlight}
      />
    ))}
  </ul>
);

export default ChannelList;
