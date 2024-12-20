/**
 * Enumeration of different event types sent from the client to the server.
 */
export enum ClientEventType {
  /** User is attempting to connect. */
  HELLO = "hello",
  /** User is attempting to join a channel. */
  JOIN = "join",
  /** User is attempting to send a message to a channel or user. */
  MESSAGE = "message",
  /** User wants to leave a channel. */
  PART = "part",
  /** User wishes to change topic of a channel. */
  TOPIC = "topic",
}

type ClientChannelEvent = {
  /** Name of the channel. */
  channel: string;
};

/**
 * Initial even that is sent when user wishes to register a nickname.
 */
export type ClientHelloEvent = {
  /** Type of the event. */
  type: ClientEventType.HELLO;
  /** The nickname user wishes to use. */
  nick: string;
};

/**
 * Event that is sent when user is sending an message.
 */
export type ClientMessageEvent = {
  /** Type of the event. */
  type: ClientEventType.MESSAGE;
  /** Contents of the message. */
  message: string;
  /** Name of the channel / user where the message is sent to. */
  target: string;
};

/**
 * Event that is sent when user wishes to join or leave a channel.
 */
export type ClientParticipancyEvent = ClientChannelEvent & {
  /** Type of the event. */
  type: ClientEventType.JOIN | ClientEventType.PART;
};

/**
 * Event that is sent when user is changing topic of the channel.
 */
export type ClientTopicEvent = ClientChannelEvent & {
  /** Type of the event. */
  type: ClientEventType.TOPIC;
  /** New topic of the channel. */
  topic: string;
};

export type ClientEvent =
  | ClientHelloEvent
  | ClientMessageEvent
  | ClientParticipancyEvent
  | ClientTopicEvent;
