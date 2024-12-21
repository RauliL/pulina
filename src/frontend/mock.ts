import { ClientEvent, ClientEventType, ListResult } from "../common";
import {
  Channel,
  ChannelUser,
  Client,
  LogEntry,
  LogEntryType,
} from "./client";
import { ClientState, RootState, UIState } from "./store";

export const mockChannelUser: Readonly<ChannelUser> = {
  isOperator: true,
  nick: "test-user",
};

export const mockChannel: Readonly<Channel> = {
  name: "#test-channel",
  hasUnreadHighlights: false,
  hasUnreadMessages: false,
  log: [],
  topic: null,
  users: [mockChannelUser],
};

export const mockListResult: Readonly<ListResult> = {
  channel: "#test-channel",
  population: 1,
  topic: null,
};

export const mockLogEntry: Readonly<LogEntry> = {
  id: "2ba52fc8-bf86-11ef-a759-23984454453d",
  isHighlight: false,
  source: "test-user",
  text: "test text",
  timestamp: 1734776864844,
  type: LogEntryType.MESSAGE,
};

export type MockClient = Client & {
  events: ClientEvent[];
  reset: () => void;
};

export const mockClient = (): MockClient => {
  const events: ClientEvent[] = [];

  return {
    events,

    list(query?: string) {
      this.send({
        type: ClientEventType.LIST,
        query: query ?? null,
      });
    },

    reset() {
      events.length = 0;
    },

    send(event) {
      events.push(event);
    },
  };
};

export const mockClientState: Readonly<ClientState> = {
  channels: {},
};

export const mockUIState: Readonly<UIState> = {
  showChannelList: false,
  showUserList: false,
};

export const mockRootState: Readonly<RootState> = {
  client: mockClientState,
  ui: mockUIState,
};
