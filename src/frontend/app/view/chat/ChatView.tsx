import React, { FunctionComponent } from "react";

import { useCurrentChannel } from "../../../hooks";
import { ChannelTitle, CommandInput, LogEntryList } from "./components";

const style = {
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto 10fr auto",
  gridTemplateAreas: '"." "." "."',
};

const ChatView: FunctionComponent = () => {
  const channel = useCurrentChannel();

  if (!channel) {
    return null;
  }

  return (
    <div style={style}>
      <ChannelTitle channel={channel} />
      <LogEntryList list={channel.log} />
      <CommandInput />
    </div>
  );
};

ChatView.displayName = "ChatView";

export default ChatView;
