import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

import { useCurrentChannel, useIsConnected } from "../hooks";
import { RootState, UIState } from "../store";
import { ChannelList } from "./components";
import { ChatView, ConnectView, JoinChannelView } from "./view";

const getLeftColumnClassName = (state: UIState) =>
  classNames(
    "bg-dark",
    "p-0",
    "border-right",
    {
      "d-none": !state.showChannelList,
    },
    "d-lg-block",
  );

const getMiddleColumnClassName = (state: UIState) =>
  classNames(
    "p-0",
    {
      "d-none": state.showChannelList || state.showUserList,
    },
    "d-lg-block",
  );

const App: FunctionComponent = () => {
  const state = useSelector<RootState, UIState>((state) => state.ui);
  const isConnected = useIsConnected();
  const currentChannel = useCurrentChannel();
  const middleColumnClassName = getMiddleColumnClassName(state);

  return (
    <Container fluid>
      <Row>
        <Col
          lg={1}
          md={12}
          className={getLeftColumnClassName(state)}
          style={{
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <ChannelList />
        </Col>
        {!isConnected ? (
          <ConnectView className={middleColumnClassName} />
        ) : currentChannel ? (
          <ChatView className={middleColumnClassName} />
        ) : (
          <JoinChannelView className={middleColumnClassName} />
        )}
      </Row>
    </Container>
  );
};

App.displayName = "App";

export default App;
