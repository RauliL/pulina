import { Socket } from "socket.io";

import { sendChannelEvent, sendError, sendEvent } from "./client";
import { ServerChannelInfoEvent, ServerEventType } from "../common";

export type ChannelUser = {
  id: string;
  isOperator: boolean;
};

export class Channel {
  private static readonly mapping = new Map<string, Channel>();

  public readonly name: string;
  public topic: string | null;
  public readonly users: Map<string, ChannelUser>;

  static join(socket: Socket, name: string) {
    let channel = this.mapping.get(name);

    if (channel) {
      if (channel.users.has(socket.handshake.auth.nick)) {
        return;
      }

      // TODO: Check for bans and password.

      channel.users.set(socket.handshake.auth.nick, {
        id: socket.id,
        isOperator: false,
      });
    } else {
      channel = new Channel(name);
      channel.users.set(socket.handshake.auth.nick, {
        id: socket.id,
        isOperator: true,
      });
      this.mapping.set(name, channel);
    }

    socket.join(name);
    sendEvent(socket, channel.channelInfoEvent);
    sendChannelEvent(socket, name, {
      type: ServerEventType.JOIN,
      channel: name,
      user: socket.handshake.auth.nick,
    });
  }

  static part(socket: Socket, name: string) {
    const channel = this.mapping.get(name);

    if (!channel || !channel.users.has(socket.handshake.auth.nick)) {
      return;
    }

    if (!channel.isOperator(socket)) {
      sendError(socket, "You are not operator on this channel.");
      return;
    }

    channel.users.delete(socket.handshake.auth.nick);
    sendChannelEvent(socket, name, {
      type: ServerEventType.PART,
      channel: name,
      user: socket.handshake.auth.nick,
    });

    // If the user was the only user in the channel, delete the channel.
    if (this.mapping.size === 0) {
      this.mapping.delete(name);
    }
  }

  static setTopic(socket: Socket, name: string, topic: string) {
    const channel = this.mapping.get(name);

    if (!channel || !channel.users.has(socket.handshake.auth.nick)) {
      console.log("Received unknown shit.");
      return;
    }

    // TODO: Limit topic size.

    channel.topic = topic;
    sendChannelEvent(socket, name, {
      type: ServerEventType.TOPIC,
      channel: name,
      topic,
      user: socket.handshake.auth.nick,
    });
  }

  constructor(name: string) {
    this.name = name;
    this.topic = null;
    this.users = new Map();
  }

  get channelInfoEvent(): ServerChannelInfoEvent {
    const users: ServerChannelInfoEvent["users"] = [];

    for (const [nick, user] of this.users.entries()) {
      users.push({ isOperator: user.isOperator, nick });
    }

    return {
      channel: this.name,
      type: ServerEventType.CHANNEL_INFO,
      topic: this.topic,
      users,
    };
  }

  isOperator(socket: Socket): boolean {
    return this.users.get(socket.handshake.auth.nick)?.isOperator ?? false;
  }

  toString(): string {
    return this.name;
  }
}
