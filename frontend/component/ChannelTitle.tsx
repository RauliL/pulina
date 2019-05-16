import * as React from 'react';

import { Channel } from '../types';

export interface Props {
  channel: Channel;
}

const ChannelTitle: React.SFC<Props> = ({ channel }) => (
  <div className="border-bottom">
    <h1 className="h3 p-2 align-middle">{channel.name}</h1>
  </div>
);

export default ChannelTitle;
