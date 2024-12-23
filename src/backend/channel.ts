import { sortBy } from "lodash";

import {
  ListResult,
  ServerChannelInfoEvent,
  ServerEventType,
} from "../common";
import { Client } from "./client";

export type ChannelUser = {
  id: string;
  isOperator: boolean;
};

export class Channel {
  private static readonly mapping = new Map<string, Channel>();

  public readonly name: string;
  public topic: string | null;
  public readonly users: Map<string, ChannelUser>;

  static list(client: Client, query: string | null) {
    const results: ListResult[] = [];

    // TODO: Add some sort of limit for these.
    if (query && query.trim().length > 0) {
      query = query.trim().toLowerCase();
      for (const channel of this.mapping.values()) {
        if (
          channel.name.toLowerCase().includes(query) ||
          (channel.topic && channel.topic.toLowerCase().includes(query))
        ) {
          results.push(channel.listResult);
        }
      }
    } else {
      for (const channel of this.mapping.values()) {
        results.push(channel.listResult);
      }
    }
    client.send({
      type: ServerEventType.LIST,
      results: sortBy(results, "population"),
    });
  }

  static join(client: Client, name: string) {
    const nick = client.getNick();
    let channel = this.mapping.get(name);
    let isOperator = false;

    if (channel) {
      if (channel.users.has(nick)) {
        client.sendError(name, "You have already joined that channel.");
        return;
      }

      // TODO: Check for bans and password.
    } else {
      channel = new Channel(name);
      this.mapping.set(name, channel);
      isOperator = true;
    }

    channel.users.set(nick, { id: client.id, isOperator });

    client.join(name);
    client.send(channel.channelInfoEvent);
    client.sendChannelEvent(name, {
      type: ServerEventType.JOIN,
      channel: name,
      user: nick,
    });
  }

  static part(client: Client, name: string) {
    const channel = this.mapping.get(name);
    const nick = client.getNick();

    if (!channel || !channel.users.has(nick)) {
      return;
    }

    channel.users.delete(nick);
    client.sendChannelEvent(name, {
      type: ServerEventType.PART,
      channel: name,
      user: nick,
    });

    // If the user was the only user in the channel, delete the channel.
    if (channel.users.size === 0) {
      this.mapping.delete(name);
    }
  }

  static setTopic(client: Client, name: string, topic: string) {
    const channel = this.mapping.get(name);
    const nick = client.getNick();

    if (!channel || !channel.users.has(nick)) {
      console.log("Received unknown shit.");
      return;
    }

    if (!channel.isOperator(nick)) {
      client.sendError(name, "You are not operator on this channel.");
      return;
    }

    // TODO: Limit topic size.

    channel.topic = topic;
    client.sendChannelEvent(name, {
      type: ServerEventType.TOPIC,
      channel: name,
      topic,
      user: nick,
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

  get listResult(): ListResult {
    return {
      channel: this.name,
      population: this.users.size,
      topic: this.topic,
    };
  }

  isOperator(nick: string): boolean {
    return this.users.get(nick)?.isOperator ?? false;
  }

  toString(): string {
    return this.name;
  }
}
