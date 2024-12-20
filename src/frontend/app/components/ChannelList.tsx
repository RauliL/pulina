import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

import { Channel } from "../../client";
import { useAllChannels, useCurrentChannel } from "../../hooks";
import { AppDispatch, uiSlice } from "../../store";
import ChannelListItem from "./ChannelListItem";

const ChannelList: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const channels = useAllChannels();
  const currentChannel = useCurrentChannel();

  const handleSelect = (channel: Channel) => () => {
    dispatch(uiSlice.actions.setCurrentChannel(channel.name));
  };

  const handleToggleClick = () => {
    dispatch(uiSlice.actions.toggleChannelList());
  };

  return (
    <ul className="list-unstyled">
      <li className="d-lg-none navbar bg-white text-body border-bottom">
        <span className="navbar-brand">Channels</span>
        <div className="float-right">
          <Button
            outline
            onClick={handleToggleClick}
            data-testid="ToggleChannelListButton"
          >
            <i className="fas fa-times" />
          </Button>
        </div>
      </li>
      {channels.map((channel) => (
        <ChannelListItem
          key={channel.name}
          name={channel.name}
          onSelect={handleSelect(channel)}
          isActive={currentChannel?.name === channel.name}
          hasUnreadMessages={channel.hasUnreadMessages}
          hasUnreadHighlights={channel.hasUnreadHighlights}
        />
      ))}
      {/* TODO: Also list private messages. */}
    </ul>
  );
};

ChannelList.displayName = "ChannelList";

export default ChannelList;
