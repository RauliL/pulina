/**
 * Enumeration of different server event types.
 */
export enum ServerEventType {
  /** User has successfully connected to the server. */
  WELCOME = "welcome",
  /** User has joined a channel. */
  JOIN = "join",
  /** User has left a channel. */
  PART = "part",
  /** User has quit the chat. */
  QUIT = "quit",
  /** User has sent a message. */
  MESSAGE = "message",
  /** List of users on a channel. */
  CHANNEL_USERS = "channel-users",
}

export type ServerEvent = {
  /** Type of the event. */
  type: ServerEventType;
};

export type ServerChannelEvent = ServerEvent & {
  type: ServerEventType.JOIN | ServerEventType.QUIT | ServerEventType.PART;
  channel: string;
  nick: string;
};

export type ServerMessageEvent = ServerEvent & {
  type: ServerEventType.MESSAGE;
  channel: string;
  nick: string;
  message: string;
};

export type ServerChannelUsersEvent = ServerEvent & {
  type: ServerEventType.CHANNEL_USERS;
  channel: string;
  users: string[];
};
