import { ClientEvent, ServerEventType } from "../common";
import { AppStore, clientSlice } from "./store";

export enum LogEntryType {
  ERROR,
  INFO,
  MESSAGE,
}

type LogEntryBase = {
  /** Unique identifier of the entry. */
  id: string;
  /** Timestamp when the entry was logged. */
  timestamp: number;
  /** Textual contents of the entry. */
  text: string;
};

export type InfoLogEntry = LogEntryBase & {
  /** Type of the log entry. */
  type: LogEntryType.ERROR | LogEntryType.INFO;
};

export type MessageLogEntry = LogEntryBase & {
  /** Whether this entry should be highlighted or not. */
  isHighlight: boolean;
  /** Source of the message. */
  source: string;
  /** Type of the log entry. */
  type: LogEntryType.MESSAGE;
};

export type LogEntry = InfoLogEntry | MessageLogEntry;

export type ChannelUser = {
  /** Whether user is operator of the channel or not. */
  isOperator: boolean;
  /** Nickname of the user. */
  nick: string;
};

export type Channel = {
  /** Name of the channel. */
  name: string;
  /** Whether this channel has unread highlighted messages or not. */
  hasUnreadHighlights: boolean;
  /** Whether this channel has unread messages or not. */
  hasUnreadMessages: boolean;
  /** Log of the channel. */
  log: LogEntry[];
  /** Current topic of the channel. */
  topic: string | null;
  /** Users currently on the channel. */
  users: ChannelUser[];
};

export type Client = {
  send: (event: ClientEvent) => void;
};

export const initializeClient = (store: AppStore): Client => {
  const socket = window.io();

  socket.on(ServerEventType.CHANNEL_INFO, (event) => {
    store.dispatch(clientSlice.actions.onChannelInfo(event));
  });

  socket.on(ServerEventType.JOIN, (event) => {
    store.dispatch(clientSlice.actions.onJoin(event));
  });

  socket.on(ServerEventType.MESSAGE, (event) => {
    store.dispatch(clientSlice.actions.onMessage(event));
  });

  socket.on(ServerEventType.PART, (event) => {
    store.dispatch(clientSlice.actions.onPart(event));
  });

  socket.on(ServerEventType.TOPIC, (event) => {
    store.dispatch(clientSlice.actions.onTopic(event));
  });

  socket.on(ServerEventType.WELCOME, ({ nick }) => {
    store.dispatch(clientSlice.actions.setCurrentNick(nick));
  });

  return {
    send(event: ClientEvent): void {
      socket.emit(event.type, event);
    },
  };
};