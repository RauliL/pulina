import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import {
  ServerChannelInfoEvent,
  ServerMessageEvent,
  ServerParticipancyEvent,
  ServerTopicEvent,
  isValidChannel,
} from "../../../common";
import { Channel, LogEntryType } from "../../client";

export type ClientState = {
  /** Channels on which the user is currently on. */
  channels: Record<string, Channel>;
  /** Nickname currently used by the user. */
  nick?: string;
};

const initialState: Readonly<ClientState> = {
  channels: {},
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    onChannelInfo: (
      state,
      {
        payload: { channel, topic, users },
      }: PayloadAction<ServerChannelInfoEvent>,
    ) => {
      state.channels[channel] = {
        name: channel,
        hasUnreadHighlights: false,
        hasUnreadMessages: false,
        log: [],
        topic: topic,
        users: users,
      };
    },

    onError: (
      state,
      {
        payload: { channel, text },
      }: PayloadAction<{ channel: string; text: string }>,
    ) => {
      state.channels[channel].log.push({
        id: uuid(),
        text,
        timestamp: Date.now(),
        type: LogEntryType.ERROR,
      });
    },

    onJoin: (
      state,
      { payload: { channel, user } }: PayloadAction<ServerParticipancyEvent>,
    ) => {
      const c = state.channels[channel];

      if (!c) {
        return;
      }

      c.log.push({
        id: uuid(),
        text: `${user} has joined ${channel}`,
        timestamp: Date.now(),
        type: LogEntryType.INFO,
      });

      // Add the user to the list of users, unless it's already there.
      if (!c.users.find((u) => u.nick === user)) {
        c.users.push({
          isOperator: false,
          nick: user,
        });
      }
    },

    onMessage: (
      state,
      {
        payload: { id, message, source, target },
      }: PayloadAction<ServerMessageEvent>,
    ) => {
      if (isValidChannel(target)) {
        const channel = state.channels[target];

        if (channel) {
          // TODO: Check for highlight.
          channel.log.push({
            id,
            isHighlight: false, // TODO: Check for highlight
            source,
            text: message,
            timestamp: Date.now(),
            type: LogEntryType.MESSAGE,
          });
        }
      } else {
        // TODO: Implement private messages.
      }
    },

    onPart: (
      state,
      { payload: { channel, user } }: PayloadAction<ServerParticipancyEvent>,
    ) => {
      const c = state.channels[channel];

      if (!c) {
        return;
      }

      // Was it the user itself who left the channel?
      if (user === state.nick) {
        delete state.channels[channel];
        return;
      }

      c.users = c.users.filter((u) => u.nick !== user);
      c.log.push({
        id: uuid(),
        text: `${user} has left ${channel}`,
        timestamp: Date.now(),
        type: LogEntryType.INFO,
      });
    },

    onTopic: (
      state,
      { payload: { channel, topic, user } }: PayloadAction<ServerTopicEvent>,
    ) => {
      const c = state.channels[channel];

      if (!c) {
        return;
      }

      c.topic = topic;
      c.log.push({
        id: uuid(),
        text: `${user} changed topic of ${channel} to: ${topic}`,
        timestamp: Date.now(),
        type: LogEntryType.INFO,
      });
    },

    setCurrentNick: (state, action: PayloadAction<string>) => {
      state.nick = action.payload;
    },
  },
});
