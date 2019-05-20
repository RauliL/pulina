import * as React from 'react';

import { ClientCommand } from '../../common/command';

import CommandInput from '../container/CommandInput';
import { Channel } from '../types/channel';

import ChannelTitle from './ChannelTitle';
import LogEntryList from './LogEntryList';

export interface Props {
  channel: Channel;
  onCommand: <T extends ClientCommand> (command: T) => void;
  onCommandError: (errorMessage: string) => void;
  onToggleChannelList: () => void;
  onToggleUserList: () => void;
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
    <ChannelTitle
      channel={props.channel}
      onToggleChannelList={props.onToggleChannelList}
      onToggleUserList={props.onToggleUserList}
    />
    <LogEntryList list={props.channel.log}/>
    <CommandInput
      currentChannel={props.channel}
      onCommand={props.onCommand}
      onCommandError={props.onCommandError}
    />
  </div>
);

export default ChannelDisplay;
