import { trim } from 'lodash';

import {
  ClientChannelCommand,
  ClientCommand,
  ClientCommandType,
} from '../common/command';
import { isBlank, isValidChannelName } from '../common/utils';

import { Channel } from './types/channel';

const parseJoinCommand = (input: string): Promise<ClientChannelCommand> => (
  new Promise((resolve, reject) => {
    let channelName: string;

    if (isBlank(input)) {
      reject('Missing channel name.');
      return;
    }

    channelName = trim(input);

    if (!isValidChannelName(channelName)) {
      reject('Invalid channel name.');
      return;
    }

    resolve({
      type: ClientCommandType.JOIN,
      channel: channelName,
    });
  })
);

const parsePartCommand = (channel: Channel,
                          input: string): Promise<ClientChannelCommand> => (
  new Promise((resolve, reject) => {
    let channelName: string;

    if (isBlank(input)) {
      channelName = channel.name;
    } else {
      channelName = trim(input);
    }

    if (!isValidChannelName(channelName)) {
      reject('Invalid channel name.');
      return;
    }

    resolve({
      type: ClientCommandType.PART,
      channel: channelName,
    });
  })
);

/**
 * Parses an user input into a client command.
 *
 * @param channel Current channel
 * @param input Input coming from the user.
 */
export const parseCommand = (channel: Channel,
                             input: string): Promise<ClientCommand> => (
  new Promise((resolve, reject) => {
    // Actual commands begin with a slash, so first look for that.
    if (input[0] !== '/') {
      // Assume it's a message being sent to the channel.
      resolve({
        type: ClientCommandType.MESSAGE,
        channel: channel.name,
        message: input,
      } as ClientCommand);
      return;
    }

    // Slash with a following whitespace and another slash is a method for
    // sending messages beginning with a slash to the channel.
    if (/^\/\s\/.+/.test(input)) {
      resolve({
        type: ClientCommandType.MESSAGE,
        channel: channel.name,
        message: input.substring(2),
      } as ClientCommand);
      return;
    }

    if (/^\/join(\s|$)/i.test(input)) {
      parseJoinCommand(trim(input.substring(6))).then(resolve, reject);
      return;
    }

    if (/^\/part(\s|$)/i.test(input)) {
      parsePartCommand(channel, trim(input.substring(6))).then(
        resolve,
        reject,
      );
      return;
    }

    reject('Unknown command.');
  })
);
