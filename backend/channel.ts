import { ErrorCode } from '../common/error';
import { ServerEvent, ServerEventType } from '../common/event';
import { isValidChannelName } from '../common/utils';

import { findConnectionById } from './connection';
import { Channel, Connection } from './types';

const registry = new Map<string, Channel>();

/**
 * Attempts to find a channel from the registry by it's name.
 *
 * @param name Name of the channel to look for.
 * @return Channel instance if such channel is found, or null otherwise.
 */
const findChannelByName = (name: string): Channel | null => (
  registry.get(name)
);

/**
 * Sends an server event to every user on a channel.
 *
 * @param name Name of the channel.
 * @param event Event to send.
 */
export const announceChannel = <T extends ServerEvent>(name: string,
                                                       event: T) => {
  const channel = findChannelByName(name);

  if (!channel) {
    return;
  }

  channel.users.forEach((id) => {
    const connection = findConnectionById(id);

    if (connection && connection.socket) {
      connection.socket.emit(event.type, event);
    }
  });
};

/**
 * Handles a channel join request coming from a client.
 *
 * @param connection Client connection that sent the request.
 * @param name Name of the channel to join.
 */
export const joinChannel = (connection: Connection, name: string) => {
  let channel: Channel;

  if (!connection.nick) {
    connection.socket.emit('client error', {
      code: ErrorCode.NOT_REGISTERED,
      message: 'You haven\'t registered a nickname yet.',
    });
    return;
  }

  if (!isValidChannelName(name)) {
    connection.socket.emit('client error', {
      code: ErrorCode.CHANNEL_INVALID,
      message: 'Not a valid name for a channel.',
    });
    return;
  }

  channel = findChannelByName(name);

  if (!channel) {
    channel = {
      name,
      users: new Set<string>(),
    };
    registry.set(name, channel);
  } else if (channel.users.has(connection.id)) {
    return;
  }

  channel.users.add(connection.id);
  connection.channels.add(name);

  // Announce the join event to everyone on the channel.
  announceChannel(name, {
    type: ServerEventType.JOIN,
    channel: name,
    nick: connection.nick,
  });

  connection.socket.emit(ServerEventType.CHANNEL_USERS, {
    type: ServerEventType.CHANNEL_USERS,
    channel: name,
    users: Array.from(channel.users)
      .map(findConnectionById)
      .filter((connection) => connection != null)
      .map((connection) => connection.nick),
  });

  process.stdout.write(`Client "${connection.id}" joined ${name}.\n`);
};

/**
 * Handles a channel part request coming from a client.
 *
 * @param connection Client connection that sent the request.
 * @param name Name of the channel to part from.
 */
export const partChannel = (connection: Connection, name: string) => {
  const channel = findChannelByName(name);

  if (!connection.nick) {
    connection.socket.emit('client error', {
      code: ErrorCode.NOT_REGISTERED,
      message: 'You haven\'t registered a nickname yet.',
    });
    return;
  }

  if (!channel) {
    connection.socket.emit('client error', {
      code: ErrorCode.CHANNEL_UNKNOWN,
      message: 'Unknown channel.',
    });
    return;
  }

  if (!channel.users.has(connection.id)) {
    connection.socket.emit('client error', {
      code: ErrorCode.NOT_ON_CHANNEL,
      message: 'You aren\'t on that channel.',
    });
    return;
  }

  // Announce the part to every user on the channel.
  announceChannel(name, {
    type: ServerEventType.PART,
    channel: name,
    nick: connection.nick,
  });

  // Remove the user from the channel.
  channel.users.delete(connection.id);

  process.stdout.write(`Client "${connection.id}" left ${name}.\n`);

  // Destroy the channel if it's empty.
  if (channel.users.size === 0) {
    registry.delete(channel.name);
    process.stdout.write(`Channel ${name} removed.\n`);
  }
};

/**
 * Handles a message request coming from a client.
 *
 * @param connection Client connection that sent the request.
 * @param name Name of the channel.
 * @param message Contents of the message.
 */
export const sendMessage = (connection: Connection,
                            name: string,
                            message: string) => {
  const channel = findChannelByName(name);

  if (!connection.nick) {
    connection.socket.emit('client error', {
      code: ErrorCode.NOT_REGISTERED,
      message: 'You haven\'t registered a nickname yet.',
    });
    return;
  }

  if (!channel) {
    connection.socket.emit('client error', {
      code: ErrorCode.CHANNEL_UNKNOWN,
      message: 'Unknown channel.',
    });
    return;
  }

  if (!channel.users.has(connection.id)) {
    connection.socket.emit('client error', {
      code: ErrorCode.NOT_ON_CHANNEL,
      message: 'You aren\'t on that channel.',
    });
    return;
  }

  // Ignore empty messages.
  if (!message || /^\s*$/.test(message)) {
    return;
  }

  // Blatantly limit length of the message to 512 characters.
  message = message.substring(0, 512);

  // TODO: Add some kind of flood prevention.

  // Announce the part to every user on the channel.
  announceChannel(name, {
    type: ServerEventType.MESSAGE,
    channel: name,
    nick: connection.nick,
    message,
  });
};
