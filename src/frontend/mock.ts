import { Channel } from "./types/channel";
import { State } from "./types/store";

export const mockChannel: Readonly<Channel> = {
  name: "#test-channel",
  users: [],
  log: [],
  hasUnreadMessages: false,
  hasUnreadHighlight: false,
};

export const mockState: Readonly<State> = {
  channels: {},
  channelListVisible: false,
  userListVisible: false,
};
