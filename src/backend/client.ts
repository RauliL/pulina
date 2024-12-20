import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

import {
  ClientEventType,
  ServerEvent,
  ServerEventType,
  ServerMessageEvent,
  isBlank,
  isValidChannel,
  isValidNick,
} from "../common";
import { Channel } from "./channel";

export type Client = {
  id: string;
  getNick: () => string;
  isRegistered: () => boolean;
  join: (room: string) => void;
  leave: (room: string) => void;
  send: (event: ServerEvent) => void;
  sendChannelEvent: (channel: string, event: ServerEvent) => void;
  sendError: (message: string) => void;
};

// Maps nicknames to socket connections.
const mapping = new Map<string, Client>();

const requireNick = (client: Client): boolean => {
  if (!client.isRegistered()) {
    client.sendError("You haven't registered a nickname yet.");

    return false;
  }

  return true;
};

const requireValidChannel = (client: Client, channel: string): boolean => {
  if (!isValidChannel(channel)) {
    client.sendError("Not a valid name for a channel.");

    return false;
  }

  return true;
};

const requireValidNick = (client: Client, nick: string): boolean => {
  if (!isValidNick(nick)) {
    client.sendError("Illegal nickname.");

    return false;
  }

  return true;
};

export const registerClient = (socket: Socket) => {
  const client: Client = {
    id: socket.id,

    getNick() {
      return socket.handshake.auth.nick;
    },

    isRegistered() {
      return typeof socket.handshake.auth.nick === "string";
    },

    join(room: string) {
      socket.join(room);
    },

    leave(room: string) {
      socket.leave(room);
    },

    send(event: ServerEvent) {
      socket.emit(event.type, event);
    },

    sendChannelEvent(channel: string, event: ServerEvent) {
      socket.to(channel).emit(event.type, event);
      socket.emit(event.type, event);
    },

    sendError(message: string) {
      this.send({ type: ServerEventType.ERROR, message });
    },
  };

  process.stdout.write(`Client "${socket.id}" has connected.\n`);

  socket.once("disconnecting", () => {
    process.stdout.write(`Client "${socket.id}" has disconnected.\n`);

    if (!client.isRegistered()) {
      return;
    }

    // Announce to all channels that the user has left.
    socket.rooms.forEach((channel) => {
      if (isValidChannel(channel)) {
        Channel.part(client, channel);
      }
    });

    // Remove user's nickname from the nickname mapping.
    mapping.delete(socket.handshake.auth.nick);
  });

  socket.on(ClientEventType.HELLO, ({ nick }) => {
    if (!requireValidNick(client, nick)) {
      return;
    }

    if (client.isRegistered()) {
      client.sendError("You already have a nickname.");
      return;
    }

    if (mapping.has(nick)) {
      client.sendError("That nickname has already been taken.");
      return;
    }

    socket.handshake.auth.nick = nick;
    mapping.set(nick, client);
    client.send({ type: ServerEventType.WELCOME, nick });
  });

  socket.on(ClientEventType.JOIN, ({ channel }) => {
    if (requireNick(client) && requireValidChannel(client, channel)) {
      Channel.join(client, channel);
    }
  });

  socket.on(ClientEventType.MESSAGE, ({ message, target }) => {
    onMessage(client, target, message);
  });

  socket.on(ClientEventType.PART, ({ channel }) => {
    if (requireNick(client) && requireValidChannel(client, channel)) {
      Channel.part(client, channel);
    }
  });

  socket.on(ClientEventType.TOPIC, ({ channel, topic }) => {
    if (requireNick(client) && requireValidChannel(client, channel)) {
      Channel.setTopic(client, channel, topic);
    }
  });
};

const onMessage = (client: Client, target: string, message: string) => {
  if (!requireNick(client) || isBlank(message)) {
    return;
  }

  // TODO: Implement some kind of flood prevention.
  // TODO: Limit message length.

  if (isValidChannel(target)) {
    client.sendChannelEvent(target, {
      type: ServerEventType.MESSAGE,
      id: uuid(),
      message,
      source: client.getNick(),
      target,
    });
    return;
  }

  if (isValidNick(target)) {
    const targetClient = mapping.get(target);

    if (targetClient) {
      const event: ServerMessageEvent = {
        type: ServerEventType.MESSAGE,
        id: uuid(),
        message,
        source: client.getNick(),
        target,
      };

      client.send(event);
      targetClient.send(event);
      return;
    }
    client.sendError("Unrecognized user.");
    return;
  }

  client.sendError("Not a valid name for a channel or a user.");
};
