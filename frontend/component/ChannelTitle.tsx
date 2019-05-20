import * as React from 'react';
import { Button, Navbar } from 'reactstrap';

import { Channel } from '../types/channel';

export interface Props {
  channel: Channel;
  onToggleChannelList: () => void;
  onToggleUserList: () => void;
}

const ChannelTitle: React.SFC<Props> = (props) => (
  <Navbar className="border-bottom">
    <span className="navbar-brand">{props.channel.name}</span>
    <div className="float-right d-lg-none">
      <Button
        outline={true}
        className="mr-2"
        onClick={props.onToggleChannelList}
      >
        <i className="fas fa-hashtag"/>
      </Button>
      <Button outline={true} onClick={props.onToggleUserList}>
        <i className="fas fa-user"/>
      </Button>
    </div>
  </Navbar>
);

export default ChannelTitle;
