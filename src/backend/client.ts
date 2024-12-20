import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

import {
  ClientEventType,
  ServerEvent,
  ServerEventType,
  isBlank,
  isValidChannel,
  isValidNick,
} from "../common";
import { Channel } from "./channel";

// Maps nicknames to socket connections.
const mapping = new Map<string, Socket>();

export const sendEvent = (socket: Socket, event: ServerEvent) => {
  socket.emit(event.type, event);
};

export const sendChannelEvent = (
  socket: Socket,
  channel: string,
  event: ServerEvent,
) => {
  socket.to(channel).emit(event.type, event);
  socket.emit(event.type, event);
};

export const sendError = (socket: Socket, message: string) => {
  sendEvent(socket, { type: ServerEventType.ERROR, message });
};

const checkNick = (socket: Socket): boolean => {
  if (!socket.handshake.auth.nick) {
    sendError(socket, "You haven't registered a nickname yet.");

    return false;
  }

  return true;
};

const checkValidChannel = (socket: Socket, channel: string): boolean => {
  if (!isValidChannel(channel)) {
    sendError(socket, "Not a valid name for a channel.");

    return false;
  }

  return true;
};

const checkValidNick = (socket: Socket, nick: string): boolean => {
  if (!isValidNick(nick)) {
    sendError(socket, "Illegal nickname.");

    return false;
  }

  return true;
};

export const registerClient = (socket: Socket) => {
  process.stdout.write(`Client "${socket.id}" has connected.\n`);

  socket.once("disconnecting", () => {
    process.stdout.write(`Client "${socket.id}" has disconnected.\n`);

    if (!socket.handshake.auth.nick) {
      return;
    }

    // Announce to all channels that the user has left.
    socket.rooms.forEach((channel) => {
      if (isValidChannel(channel)) {
        Channel.part(socket, channel);
      }
    });

    // Remove user's nickname from the nickname mapping.
    mapping.delete(socket.handshake.auth.nick);
  });

  socket.on(ClientEventType.HELLO, ({ nick }) => {
    onHello(socket, nick);
  });

  socket.on(ClientEventType.JOIN, ({ channel }) => {
    if (checkNick(socket) && checkValidChannel(socket, channel)) {
      Channel.join(socket, channel);
    }
  });

  socket.on(ClientEventType.MESSAGE, ({ message, target }) => {
    onMessage(socket, target, message);
  });

  socket.on(ClientEventType.PART, ({ channel }) => {
    if (checkNick(socket) && checkValidChannel(socket, channel)) {
      Channel.part(socket, channel);
    }
  });

  socket.on(ClientEventType.TOPIC, ({ channel, topic }) => {
    if (checkNick(socket) && checkValidChannel(socket, channel)) {
      Channel.setTopic(socket, channel, topic);
    }
  });
};

const onHello = (socket: Socket, nick: string) => {
  if (!checkValidNick(socket, nick)) {
    return;
  }

  if (socket.handshake.auth.nick) {
    sendError(socket, "You already have a nickname.");
    return;
  }

  if (mapping.has(nick)) {
    sendError(socket, "That nickname has already been taken.");
    return;
  }

  socket.handshake.auth.nick = nick;
  mapping.set(nick, socket);
  sendEvent(socket, {
    type: ServerEventType.WELCOME,
    nick,
  });
};

const onMessage = (socket: Socket, target: string, message: string) => {
  if (!checkNick(socket) || isBlank(message)) {
    return;
  }

  // TODO: Implement some kind of flood prevention.
  // TODO: Limit message length.

  if (isValidChannel(target)) {
    sendChannelEvent(socket, target, {
      type: ServerEventType.MESSAGE,
      id: uuid(),
      message,
      source: socket.handshake.auth.nick,
      target,
    });
    return;
  }

  if (isValidNick(target)) {
    // TODO: Implement private messages.
    return;
  }

  sendError(socket, "Not a valid name for a channel or a user.");
};
