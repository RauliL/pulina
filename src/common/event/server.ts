/**
 * Enumeration of different event types sent from the server to the client.
 */
export enum ServerEventType {
  /** Client has successfully joined a channel. */
  JOIN = "join",
}

export type ServerEvent = {
  /** Type of the event. */
  type: ServerEventType;
};

export type ServerJoinEvent = {
  type: ServerEventType.JOIN;
  /** Name of the channel. */
  channel: string;
  /** Topic of the channel, if any. */
  topic: string | null;
  /** List of users in the channel. */
  users: string[];
};
