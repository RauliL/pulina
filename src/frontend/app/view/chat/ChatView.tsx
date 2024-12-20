import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { Col } from "reactstrap";

import { useCurrentChannel } from "../../../hooks";
import {
  ChannelTitle,
  CommandInput,
  LogEntryList,
  UserList,
} from "./components";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const style = {
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto 10fr auto",
  gridTemplateAreas: '"." "." "."',
};

const getUserListClassName = (showUserList: boolean) =>
  classNames(
    "p-0",
    "border-left",
    {
      "d-none": !showUserList,
    },
    "d-lg-block",
  );

export type ChatViewProps = {
  className: string;
};

const ChatView: FunctionComponent<ChatViewProps> = ({ className }) => {
  const channel = useCurrentChannel();
  const showUserList = useSelector<RootState, boolean>(
    (state) => state.ui.showUserList,
  );

  if (!channel) {
    return null;
  }

  return (
    <>
      <Col lg={10} md={12} className={className}>
        <div style={style}>
          <ChannelTitle channel={channel} />
          <LogEntryList list={channel.log} />
          <CommandInput />
        </div>
      </Col>
      <Col
        lg={1}
        md={12}
        className={getUserListClassName(showUserList)}
        style={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <UserList channel={channel} />
      </Col>
    </>
  );
};

ChatView.displayName = "ChatView";

export default ChatView;
