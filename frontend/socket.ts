import { ErrorCode } from '../common/error';
import {
  ServerChannelEvent,
  ServerChannelUsersEvent,
  ServerEventType,
  ServerMessageEvent,
} from '../common/event';

import {
  onChannelError,
  onChannelMessage,
  onChannelUsers,
  onJoinChannel,
  onNickError,
  onNickRegistered,
  onQuitChannel,
  onPartChannel,
} from './action';
import { PulinaStore } from './types';

export const initializeSocket = (store: PulinaStore): Socket => {
  const socket = window.io();

  socket.on(ServerEventType.WELCOME, ({ nick }) => {
    store.dispatch(onNickRegistered(nick));
    window.localStorage.setItem('nick', nick);
  });

  socket.on(ServerEventType.JOIN, (event: ServerChannelEvent) => (
    store.dispatch(onJoinChannel(event))
  ));

  socket.on(ServerEventType.PART, (event: ServerChannelEvent) => (
    store.dispatch(onPartChannel(event))
  ));

  socket.on(ServerEventType.QUIT, (event: ServerChannelEvent) => (
    store.dispatch(onQuitChannel(event))
  ));

  socket.on(ServerEventType.MESSAGE, (event: ServerMessageEvent) => (
    store.dispatch(onChannelMessage(event))
  ));

  socket.on(
    ServerEventType.CHANNEL_USERS,
    (event: ServerChannelUsersEvent) => store.dispatch(onChannelUsers(event)),
  );

  socket.on('client error', ({ code, message }) => {
    console.error(code, message);
    if (code === ErrorCode.NICK_INVALID ||
        code === ErrorCode.NICK_ALREADY_TAKEN) {
      store.dispatch(onNickError(message));
    } else {
      store.dispatch(onChannelError(message));
    }
  });

  return socket;
};
