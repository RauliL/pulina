import { createAction } from "@reduxjs/toolkit";

import {
  ServerChannelEvent,
  ServerChannelUsersEvent,
  ServerMessageEvent,
} from "../common/event";

export const onNickError = createAction<string>("NICK_ERROR");
export const onNickRegistered = createAction<string>("NICK_REGISTERED");

export const onJoinChannel = createAction<ServerChannelEvent>("CHANNEL_JOIN");
export const onPartChannel = createAction<ServerChannelEvent>("CHANNEL_PART");
export const onQuitChannel = createAction<ServerChannelEvent>("CHANNEL_QUIT");
export const onChannelMessage =
  createAction<ServerMessageEvent>("CHANNEL_MESSAGE");
export const onChannelUsers =
  createAction<ServerChannelUsersEvent>("CHANNEL_USERS");
export const onChannelError = createAction<string>("CHANNEL_ERROR");

export const changeCurrentChannel = createAction<string>("CHANNEL_CHANGE");
export const toggleChannelList = createAction("CHANNEL_LIST_TOGGLE");
export const toggleUserList = createAction("USER_LIST_TOGGLE");
