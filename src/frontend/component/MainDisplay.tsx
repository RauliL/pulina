import React, { FunctionComponent } from "react";

import { ClientCommand, ClientCommandType } from "../../common/command";

import NickForm from "../container/NickForm";
import { Channel } from "../types/channel";

import ChannelDisplay from "./ChannelDisplay";
import JoinChannelForm from "./JoinChannelForm";

export type StateProps = {
  isNickRegistered: boolean;
  currentChannel?: Channel;
};

export type DispatchProps = {
  onCommandError: (errorMessage: string) => void;
  onToggleChannelList: () => void;
  onToggleUserList: () => void;
};

export type Props = StateProps &
  DispatchProps & {
    onCommand: <T extends ClientCommand>(command: T) => void;
  };

const MainDisplay: FunctionComponent<Props> = (props) => {
  if (!props.isNickRegistered) {
    return (
      <NickForm
        onSubmit={(nick) =>
          props.onCommand({
            type: ClientCommandType.NICK,
            nick,
          })
        }
      />
    );
  }

  if (!props.currentChannel) {
    return (
      <JoinChannelForm
        onSubmit={(channel) =>
          props.onCommand({
            type: ClientCommandType.JOIN,
            channel,
          })
        }
      />
    );
  }

  return (
    <ChannelDisplay
      channel={props.currentChannel}
      onCommand={props.onCommand}
      onCommandError={props.onCommandError}
      onToggleChannelList={props.onToggleChannelList}
      onToggleUserList={props.onToggleUserList}
    />
  );
};

export default MainDisplay;
