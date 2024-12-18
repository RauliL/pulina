import classNames from "classnames";
import React from "react";
import { Col, Container, Row } from "reactstrap";

import { ClientCommand } from "../../common/command";

import ChannelList from "../container/ChannelList";
import ChannelUserList from "../container/ChannelUserList";
import MainDisplay from "../container/MainDisplay";

export interface StateProps {
  channelListVisible: boolean;
  userListVisible: boolean;
}

export interface OwnProps {
  socket: Socket;
}

export type Props = StateProps & OwnProps;

const getLeftColumnClassName = (props: Props) =>
  classNames(
    "bg-dark",
    "p-0",
    "border-right",
    {
      "d-none": !props.channelListVisible,
    },
    "d-lg-block",
  );

const getMiddleColumnClassName = (props: Props) =>
  classNames(
    "p-0",
    {
      "d-none": props.channelListVisible || props.userListVisible,
    },
    "d-lg-block",
  );

const getRightColumnClassName = (props: Props) =>
  classNames(
    "p-0",
    "border-left",
    {
      "d-none": !props.userListVisible,
    },
    "d-lg-block",
  );

export default class App extends React.Component<Props> {
  public componentWillUnmount() {
    this.props.socket.close();
  }

  public render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col
            lg={1}
            md={12}
            className={getLeftColumnClassName(this.props)}
            style={{
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <ChannelList />
          </Col>
          <Col
            lg={10}
            md={12}
            className={getMiddleColumnClassName(this.props)}
            style={{ height: "100vh" }}
          >
            <MainDisplay onCommand={this.onCommand} />
          </Col>
          <Col
            lg={1}
            md={12}
            className={getRightColumnClassName(this.props)}
            style={{
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <ChannelUserList />
          </Col>
        </Row>
      </Container>
    );
  }

  private onCommand = <T extends ClientCommand>(command: T) => {
    this.props.socket.emit(command.type, command);
  };
}
