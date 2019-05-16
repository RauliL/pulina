import * as React from 'react';

import { ClientCommand, ClientCommandType } from '../../common/command';

import NickForm from '../container/NickForm';
import { Channel } from '../types';

import ChannelDisplay from './ChannelDisplay';
import JoinChannelForm from './JoinChannelForm';

export interface StateProps {
  isNickRegistered: boolean;
  currentChannel?: Channel;
}

export interface DispatchProps {
  onCommandError: (errorMessage: string) => void;
}

export type Props =
  StateProps &
  DispatchProps & {
    onCommand: <T extends ClientCommand> (command: T) => void
  };

const MainDisplay: React.SFC<Props> = (props) => {
  if (!props.isNickRegistered) {
    return (
      <NickForm
        onSubmit={(nick) => props.onCommand({
          type: ClientCommandType.NICK,
          nick,
        })}
      />
    );
  }

  if (!props.currentChannel) {
    return (
      <JoinChannelForm
        onSubmit={(channel) => props.onCommand({
          type: ClientCommandType.JOIN,
          channel,
        })}
      />
    );
  }

  return (
    <ChannelDisplay
      channel={props.currentChannel}
      onCommand={props.onCommand}
      onCommandError={props.onCommandError}
    />
  );
};

export default MainDisplay;
