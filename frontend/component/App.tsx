import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { ClientCommand } from '../../common/command';

import ChannelList from '../container/ChannelList';
import ChannelUserList from '../container/ChannelUserList';
import MainDisplay from '../container/MainDisplay';

export interface Props {
  socket: Socket;
}

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
            className="bg-dark p-0 border-right"
            style={{
              height: '100vh',
              overflowY: 'auto',
            }}
          >
            <ChannelList/>
          </Col>
          <Col lg={10} className="p-0" style={{ height: '100vh' }}>
            <MainDisplay onCommand={this.onCommand}/>
          </Col>
          <Col
            lg={1}
            className="p-0 border-left"
            style={{
              height: '100vh',
              overflowY: 'auto',
            }}>
            <ChannelUserList/>
          </Col>
        </Row>
      </Container>
    );
  }

  private onCommand = <T extends ClientCommand> (command: T) => {
    this.props.socket.emit(command.type, command);
  };
}
