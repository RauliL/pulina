import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Button, Navbar } from "reactstrap";

import { Channel } from "../../../../client";
import { AppDispatch, uiSlice } from "../../../../store";

export type ChannelTitleProps = {
  channel: Channel;
};

const ChannelTitle: FunctionComponent<ChannelTitleProps> = ({ channel }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChannelListToggleClick = () => {
    dispatch(uiSlice.actions.toggleChannelList());
  };

  const handleUserListToggleClick = () => {
    dispatch(uiSlice.actions.toggleUserList());
  };

  return (
    <Navbar className="border-bottom">
      <span className="navbar-brand">{channel.name}</span>
      {channel.topic && <span>{channel.topic}</span>}
      <div className="float-right d-lg-none">
        <Button
          outline
          className="btn-toggle-channel-list mr-2"
          onClick={handleChannelListToggleClick}
        >
          <i className="fas fa-hashtag" />
        </Button>
        <Button
          outline
          className="btn-toggle-user-list"
          onClick={handleUserListToggleClick}
        >
          <i className="fas fa-user" />
        </Button>
      </div>
    </Navbar>
  );
};

ChannelTitle.displayName = "ChannelTitle";

export default ChannelTitle;
