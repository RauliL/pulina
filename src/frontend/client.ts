import {
  ClientEvent,
  ClientEventType,
  ServerChannelInfoEvent,
  ServerErrorEvent,
  ServerEvent,
  ServerEventType,
  ServerListEvent,
  ServerMessageEvent,
  ServerParticipancyEvent,
  ServerTopicEvent,
} from "../common";
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
  list: (query?: string) => void;
  send: (event: ClientEvent, callback?: (event: ServerEvent) => void) => void;
};

export const initializeClient = (store: AppStore): Client => {
  const socket = window.io();

  socket.on(ServerEventType.CHANNEL_INFO, (event) => {
    store.dispatch(
      clientSlice.actions.onChannelInfo(event as ServerChannelInfoEvent),
    );
  });

  socket.on(ServerEventType.ERROR, (event) => {
    store.dispatch(
      clientSlice.actions.onError(event as unknown as ServerErrorEvent),
    );
  });

  socket.on(ServerEventType.JOIN, (event) => {
    store.dispatch(
      clientSlice.actions.onJoin(event as ServerParticipancyEvent),
    );
  });

  socket.on(ServerEventType.LIST, (event) => {
    store.dispatch(clientSlice.actions.onList(event as ServerListEvent));
  });

  socket.on(ServerEventType.MESSAGE, (event) => {
    store.dispatch(clientSlice.actions.onMessage(event as ServerMessageEvent));
  });

  socket.on(ServerEventType.PART, (event) => {
    store.dispatch(
      clientSlice.actions.onPart(event as ServerParticipancyEvent),
    );
  });

  socket.on(ServerEventType.TOPIC, (event) => {
    store.dispatch(clientSlice.actions.onTopic(event as ServerTopicEvent));
  });

  socket.on(ServerEventType.WELCOME, ({ nick }) => {
    store.dispatch(clientSlice.actions.setCurrentNick(nick));
  });

  return {
    list(query) {
      socket.emit(ClientEventType.LIST, {
        type: ClientEventType.LIST,
        query: query ?? null,
      });
    },

    send(event, callback) {
      socket.emit(event.type, event, callback);
    },
  };
};
