/**
 * Enumeration of different log entry types.
 */
export enum LogEntryType {
  /** User has joined the channel. */
  JOIN = 'join',
  /** User has left the channel. */
  PART = 'part',
  /** User has quit the chat. */
  QUIT = 'quit',
  /** User sent a message. */
  MESSAGE = 'message',
  /** An error occurred. */
  ERROR = 'error',
}

export interface LogEntry {
  /** Unique identifier of the log entry. */
  id: string;
  /** Timestamp when the log entry was created. */
  timestamp: number;
  /** Type of the log entry. */
  type: LogEntryType;
  /** Name of the channel. */
  channel: string;
}

export interface JoinLogEntry extends LogEntry {
  /** Type of the event. */
  type: LogEntryType.JOIN;
  /** Nickname of the user who joined. */
  nick: string;
}

export interface PartLogEntry extends LogEntry {
  /** Type of the event. */
  type: LogEntryType.PART;
  /** Nickname of the user who left. */
  nick: string;
}

export interface QuitLogEntry extends LogEntry {
  /** Type of the event. */
  type: LogEntryType.QUIT;
  /** Nickname of the user who quit. */
  nick: string;
}

export interface MessageLogEntry extends LogEntry {
  /** Type of the event. */
  type: LogEntryType.MESSAGE;
  /** Nickname of the user who sent the message. */
  nick: string;
  /** The message that was sent. */
  message: string;
  /** Whether the message should be highlighted or not. */
  isHighlight: boolean;
}

export interface ErrorLogEntry extends LogEntry {
  /** Type of the event. */
  type: LogEntryType.ERROR;
  /** The error message. */
  message: string;
}
