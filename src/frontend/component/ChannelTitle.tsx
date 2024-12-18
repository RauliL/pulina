import React, { FunctionComponent } from "react";
import { Button, Navbar } from "reactstrap";

import { Channel } from "../types/channel";

export type Props = {
  channel: Channel;
  onToggleChannelList: () => void;
  onToggleUserList: () => void;
};

const ChannelTitle: FunctionComponent<Props> = (props) => (
  <Navbar className="border-bottom">
    <span className="navbar-brand">{props.channel.name}</span>
    <div className="float-right d-lg-none">
      <Button
        outline={true}
        className="btn-toggle-channel-list mr-2"
        onClick={props.onToggleChannelList}
      >
        <i className="fas fa-hashtag" />
      </Button>
      <Button
        outline={true}
        className="btn-toggle-user-list"
        onClick={props.onToggleUserList}
      >
        <i className="fas fa-user" />
      </Button>
    </div>
  </Navbar>
);

export default ChannelTitle;
