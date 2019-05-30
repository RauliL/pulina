import { Channel } from './types/channel';
import { State } from './types/store';

export const mockChannel: Channel = {
  name: '#test-channel',
  users: [],
  log: [],
  hasUnreadMessages: false,
  hasUnreadHighlight: false,
};

export const mockState: State = {
  channels: {},
  channelListVisible: false,
  userListVisible: false,
};
