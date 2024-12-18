/**
 * Enumeration of different event types sent from the server to the client.
 */
export enum ServerEventType {
  /** Information about a channel. */
  CHANNEL_INFO = "channel-info",
  /** Error message. */
  ERROR = "error",
  /** User has joined a channel. */
  JOIN = "join",
  /** User has sent an message to a channel or user. */
  MESSAGE = "message",
  /** User has left a channel. */
  PART = "part",
  /** Topic of an channel has changed. */
  TOPIC = "topic",
  /** Sent to client when the connection has been established. */
  WELCOME = "welcome",
}

type ServerChannelEvent = {
  /** Name of the channel. */
  channel: string;
  /** User who performed the action. */
  user: string;
};

export type ServerErrorEvent = {
  /** Type of the event. */
  type: ServerEventType.ERROR;
  /** Error message. */
  message: string;
};

/**
 * Event containing information about an channel. This is sent to an client
 * after it has successfully joined a channel.
 */
export type ServerChannelInfoEvent = {
  /** Type of the event. */
  type: ServerEventType.CHANNEL_INFO;
  /** Name of the channel. */
  channel: string;
  /** Topic of the channel, if any. */
  topic: string | null;
  /** List of users in the channel. */
  users: Array<{
    /** Whether the user is operator of the channel. */
    isOperator: boolean;
    /** Nickname of the user. */
    nick: string;
  }>;
};

export type ServerMessageEvent = {
  /** Type of the event. */
  type: ServerEventType.MESSAGE;
  /** Unique ID of the message. */
  id: string;
  /** Contents of the message. */
  message: string;
  /** Name of the user who sent the message. */
  source: string;
  /** Name of the channel / user where the message is sent to. */
  target: string;
};

export type ServerParticipancyEvent = ServerChannelEvent & {
  /** Type of the event. */
  type: ServerEventType.JOIN | ServerEventType.PART;
};

export type ServerTopicEvent = ServerChannelEvent & {
  /** Type of the event. */
  type: ServerEventType.TOPIC;
  /** New topic of the channel. */
  topic: string;
};

export type ServerWelcomeEvent = {
  /** Type of the event. */
  type: ServerEventType.WELCOME;
  /** Nickname of the user. */
  nick: string;
};

export type ServerEvent =
  | ServerChannelInfoEvent
  | ServerErrorEvent
  | ServerMessageEvent
  | ServerParticipancyEvent
  | ServerTopicEvent
  | ServerWelcomeEvent;
