import { format } from 'date-fns';
import * as React from 'react';

export interface Props {
  timestamp: number;
}

export const LogEntryTimestamp: React.SFC<Props> = ({ timestamp }) => (
  <span title={format(timestamp, 'YYYY-MM-DD HH:mm:ss')}>
    {format(timestamp, 'HH:mm')}
  </span>
);

export default LogEntryTimestamp;
