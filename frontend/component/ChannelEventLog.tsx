import * as React from 'react';
import { Container } from 'reactstrap';

import { ChannelEvent } from '../types';

import ChannelEventLogItem from './ChannelEventLogItem';

export interface Props {
  list: ChannelEvent[];
}

const style: React.CSSProperties = {
  overflowY: 'auto',
  fontFamily: '"Fira Mono", monospace',
};

export default class ChannelEventLog extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    // If the number of events in the log has changed since last update, scroll
    // down the log so that the most recent one is always visible.
    if (this.props.list.length !== prevProps.list.length) {
      const container = document.getElementById('channel-event-log');

      if (container) {
        container.scroll({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }

  public render() {
    return (
      <Container id="channel-event-log" fluid={true} style={style}>
        {this.props.list.map((event) => (
          <ChannelEventLogItem
            key={event.id}
            event={event}
          />
        ))}
      </Container>
    );
  }
}
