import * as React from 'react';
import { Col, Row } from 'reactstrap';

import {
  ChannelErrorEvent,
  ChannelEvent,
  ChannelEventType,
  ChannelJoinEvent,
  ChannelMessageEvent,
  ChannelPartEvent,
  ChannelQuitEvent,
} from '../types';

import ChannelEventTimestamp from './ChannelEventTimestamp';

export interface Props {
  event: ChannelEvent;
}

const renderJoinEvent = (event: ChannelJoinEvent) => (
  `* ${event.nick} has joined ${event.channel}`
);

const renderPartEvent = (event: ChannelPartEvent) => (
  `* ${event.nick} has left ${event.channel}`
);

const renderQuitEvent = (event: ChannelQuitEvent) => (
  `* ${event.nick} has quit`
);

const renderMessageEvent = (event: ChannelMessageEvent) => (
  `<${event.nick}> ${event.message}`
);

const renderErrorEvent = (event: ChannelErrorEvent) => event.message;

const renderEvent = (event: ChannelEvent) => {
  switch (event.type) {
    case ChannelEventType.JOIN:
      return renderJoinEvent(event as ChannelJoinEvent);

    case ChannelEventType.PART:
      return renderPartEvent(event as ChannelPartEvent);

    case ChannelEventType.QUIT:
      return renderQuitEvent(event as ChannelQuitEvent);

    case ChannelEventType.MESSAGE:
      return renderMessageEvent(event as ChannelMessageEvent);

    case ChannelEventType.ERROR:
      return renderErrorEvent(event as ChannelErrorEvent);
  }
};

const getEventClassName = (event: ChannelEvent): string | undefined => {
  switch (event.type) {
    case ChannelEventType.JOIN:
    case ChannelEventType.PART:
      return 'text-success';

    case ChannelEventType.QUIT:
      return 'text-info';

    case ChannelEventType.ERROR:
      return 'text-danger';

    default:
      return undefined;
  }
};

const ChannelEventLogItem: React.SFC<Props> = ({ event }) => (
  <Row>
    <Col lg="auto" className="pl-2 pr-2 text-secondary">
      <ChannelEventTimestamp timestamp={event.timestamp}/>
    </Col>
    <Col className={`text-break ${getEventClassName(event)}`}>
      {renderEvent(event)}
    </Col>
  </Row>
);

export default ChannelEventLogItem;
