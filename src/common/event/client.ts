/**
 * Enumeration of different event types sent from the client to the server.
 */
export enum ClientEventType {
  /** User is attempting to join a channel. */
  JOIN = "join",
  /** User is attempting to register a nickname. */
  NICK = "nick",
  /** User wants to leave a channel. */
  PART = "part",
}

export type ClientEvent = {
  /** Type of the event. */
  type: ClientEventType;
};

export type ClientJoinEvent = ClientEvent & {
  type: ClientEventType.JOIN;
  /** Name of the channel. */
  channel: string;
};

export type ClientNickEvent = ClientEvent & {
  type: ClientEventType.NICK;
  /** The nickname user wishes to use. */
  nick: string;
};

export type ClientPartEvent = ClientEvent & {
  type: ClientEventType.PART;
  /** Name of the channel. */
  channel: string;
};
