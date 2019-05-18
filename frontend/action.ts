import actionCreatorFactory from 'typescript-fsa';

import {
  ServerChannelEvent,
  ServerChannelUsersEvent,
  ServerMessageEvent,
} from '../common/event';

const actionCreator = actionCreatorFactory();

export const onNickError = actionCreator<string>('NICK_ERROR');
export const onNickRegistered = actionCreator<string>('NICK_REGISTERED');

export const onJoinChannel = actionCreator<ServerChannelEvent>('CHANNEL_JOIN');
export const onPartChannel = actionCreator<ServerChannelEvent>('CHANNEL_PART');
export const onQuitChannel = actionCreator<ServerChannelEvent>('CHANNEL_QUIT');
export const onChannelMessage = actionCreator<ServerMessageEvent>(
  'CHANNEL_MESSAGE',
);
export const onChannelUsers = actionCreator<ServerChannelUsersEvent>(
  'CHANNEL_USERS',
);
export const onChannelError = actionCreator<string>('CHANNEL_ERROR');

export const changeCurrentChannel = actionCreator<string>('CHANNEL_CHANGE');
export const toggleChannelList = actionCreator('CHANNEL_LIST_TOGGLE');
export const toggleUserList = actionCreator('USER_LIST_TOGGLE');
