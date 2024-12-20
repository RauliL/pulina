import { noop } from "lodash";

import { Channel, Client } from "./client";
import { ClientState, RootState, UIState } from "./store";

export const mockChannel: Readonly<Channel> = {
  name: "#test-channel",
  hasUnreadHighlights: false,
  hasUnreadMessages: false,
  log: [],
  topic: null,
  users: [],
};

export const mockClient: Readonly<Client> = {
  send: noop,
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
