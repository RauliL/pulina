import { noop } from "lodash";

import { Channel, ChannelUser, Client } from "./client";
import { ClientState, RootState, UIState } from "./store";
import { ClientEvent } from "../common";

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

export type MockClient = Client & {
  events: ClientEvent[];
  reset: () => void;
};

export const mockClient = (): MockClient => {
  const events: ClientEvent[] = [];

  return {
    events,

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
