import * as React from 'react';

import { ClientCommand } from '../../common/command';

import { Channel } from '../types';

import ChannelEventLog from './ChannelEventLog';
import ChannelTitle from './ChannelTitle';
import CommandInput from './CommandInput';

export interface Props {
  channel: Channel;
  onCommand: <T extends ClientCommand> (command: T) => void;
  onCommandError: (errorMessage: string) => void;
}

const style = {
  display: 'grid',
  height: '100vh',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 10fr auto',
  gridTemplateAreas: '"." "." "."',
};

const ChannelDisplay: React.SFC<Props> = (props) => (
  <div style={style}>
    <ChannelTitle channel={props.channel}/>
    <ChannelEventLog list={props.channel.events}/>
    <CommandInput
      currentChannel={props.channel}
      onCommand={props.onCommand}
      onCommandError={props.onCommandError}
    />
  </div>
);

export default ChannelDisplay;
