import * as React from 'react';
import { Container } from 'reactstrap';

import { LogEntry } from '../types/log';

import LogEntryListItem from './LogEntryListItem';

export interface Props {
  list: LogEntry[];
}

const style: React.CSSProperties = {
  overflowY: 'auto',
  fontFamily: '"Fira Mono", monospace',
};

export default class LogEntryList extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    // If the number of events in the log has changed since last update, scroll
    // down the log so that the most recent one is always visible.
    if (this.props.list.length !== prevProps.list.length) {
      const container = document.getElementById('channel-log');

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
      <Container id="channel-log" fluid={true} style={style}>
        {this.props.list.map((entry) => (
          <LogEntryListItem
            key={entry.id}
            entry={entry}
          />
        ))}
      </Container>
    );
  }
}
