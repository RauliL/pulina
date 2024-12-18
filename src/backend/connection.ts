import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

import { ClientCommandType } from "../common/command";
import { ErrorCode } from "../common/error";
import { ServerEventType } from "../common/event";
import { isValidNick } from "../common/utils";

import {
  announceChannel,
  joinChannel,
  partChannel,
  sendMessage,
} from "./channel";
import { Connection } from "./types";

const registry = new Map<string, Connection>();
const nickRegistry = new Map<string, string>();

export const findConnectionById = (id: string): Connection | undefined =>
  registry.get(id);

export const registerConnection = (socket: Socket): Connection => {
  const connection: Connection = {
    id: uuid(),
    socket,
    channels: new Set<string>(),
  };

  process.stdout.write(`Client "${connection.id}" has connected.\n`);

  registry.set(connection.id, connection);

  socket.once("disconnecting", () => {
    process.stdout.write(`Client "${connection.id}" has disconnected.\n`);
    registry.delete(connection.id);
    if (!connection.nick) {
      return;
    }
    nickRegistry.delete(connection.nick);
    connection.channels.forEach((channel) =>
      announceChannel(channel, {
        type: ServerEventType.QUIT,
        channel,
        nick: connection.nick,
      }),
    );
  });

  socket.on(ClientCommandType.NICK, ({ nick }) => {
    if (!isValidNick(nick)) {
      socket.emit("client error", {
        code: ErrorCode.NICK_INVALID,
        message: "Illegal nickname.",
      });
      return;
    }

    if (connection.nick) {
      socket.emit("client error", {
        code: ErrorCode.NICK_ALREADY_TAKEN,
        message: "You already have a nickname.",
      });
      return;
    }

    if (nickRegistry.has(nick)) {
      socket.emit("client error", {
        code: ErrorCode.NICK_ALREADY_TAKEN,
        message: "That nickname has already been taken.",
      });
      return;
    }

    connection.nick = nick;
    nickRegistry.set(nick, connection.id);
    socket.emit(ServerEventType.WELCOME, { nick });
  });

  socket.on(ClientCommandType.JOIN, ({ channel }) =>
    joinChannel(connection, channel),
  );
  socket.on(ClientCommandType.PART, ({ channel }) =>
    partChannel(connection, channel),
  );
  socket.on(ClientCommandType.MESSAGE, ({ channel, message }) =>
    sendMessage(connection, channel, message),
  );

  return connection;
};
