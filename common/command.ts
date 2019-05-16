/**
 * Enumeration of different client command types.
 */
export enum ClientCommandType {
  /** User is attempting to register a nickname. */
  NICK = 'nick',
  /** User is attempting to join a channel. */
  JOIN = 'join',
  /** User is attempting to leave a channel. */
  PART = 'part',
  /** User is attempting to send a message. */
  MESSAGE = 'message',
}

export interface ClientCommand {
  /** Type of the command. */
  type: ClientCommandType;
}

export interface ClientNickCommand extends ClientCommand {
  /** Type of the command. */
  type: ClientCommandType.NICK;
  /** The nickname user wishes to use. */
  nick: string;
}

export interface ClientChannelCommand extends ClientCommand {
  /** Type of the command. */
  type: ClientCommandType.JOIN | ClientCommandType.PART;
  /** Name of the channel. */
  channel: string;
}

export interface ClientMessageCommand extends ClientCommand {
  /** Type of the command. */
  type: ClientCommandType.MESSAGE;
  /** Name of the channel where the message is sent. */
  channel: string;
  /** Message to be sent. */
  message: string;
}
