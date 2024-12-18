import { createReducer } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import {
  changeCurrentChannel,
  onChannelError,
  onChannelMessage,
  onChannelUsers,
  onJoinChannel,
  onNickError,
  onNickRegistered,
  onPartChannel,
  onQuitChannel,
  toggleChannelList,
  toggleUserList,
} from "./action";
import { LogEntryType } from "./types/log";
import { State } from "./types/store";
import { getCurrentChannel } from "./utils";

const initialState: Readonly<State> = {
  channels: {},
  channelListVisible: false,
  userListVisible: false,
};

export const reducer = createReducer<State>(initialState, (builder) => {
  builder
    .addCase(onNickError, (state, action) => ({
      ...state,
      nickError: action.payload,
    }))
    .addCase(onNickRegistered, (state, action) => ({
      ...state,
      nick: action.payload,
      nickError: undefined,
    }))
    .addCase(onJoinChannel, (state, action) => {
      const { nick } = action.payload;
      let { currentChannel } = state;
      let channel = state.channels[action.payload.channel];

      if (!channel) {
        if (nick !== state.nick) {
          return state;
        }
        channel = {
          name: action.payload.channel,
          users: [],
          log: [],
          hasUnreadMessages: false,
          hasUnreadHighlight: false,
        };
        currentChannel = channel.name;
      }

      return {
        ...state,
        currentChannel,
        channels: {
          ...state.channels,
          [channel.name]: {
            ...channel,
            users: [...channel.users, nick],
            log: [
              ...channel.log,
              {
                id: uuid(),
                timestamp: Date.now(),
                type: LogEntryType.JOIN,
                channel: channel.name,
                nick,
              },
            ],
          },
        },
      };
    })
    .addCase(onPartChannel, (state, action) => {
      const { nick } = action.payload;
      const channel = state.channels[action.payload.channel];

      if (!channel) {
        return state;
      }

      // Is the current user leaving a channel?
      if (nick === state.nick) {
        const channelsCopy = Object.assign({}, state.channels);
        let { currentChannel } = state;

        if (currentChannel === channel.name) {
          currentChannel = undefined;
        }

        delete channelsCopy[channel.name];

        return {
          ...state,
          currentChannel,
          channels: channelsCopy,
        };
      }

      return {
        ...state,
        channels: {
          ...state.channels,
          [channel.name]: {
            ...channel,
            users: channel.users.filter((user) => user !== nick),
            log: [
              ...channel.log,
              {
                id: uuid(),
                timestamp: Date.now(),
                type: LogEntryType.PART,
                channel: channel.name,
                nick,
              },
            ],
          },
        },
      };
    })
    .addCase(onQuitChannel, (state, action) => {
      const { nick } = action.payload;
      const channel = state.channels[action.payload.channel];

      if (!channel) {
        return state;
      }

      return {
        ...state,
        channels: {
          ...state.channels,
          [channel.name]: {
            ...channel,
            users: channel.users.filter((user) => user !== nick),
            log: [
              ...channel.log,
              {
                id: uuid(),
                timestamp: Date.now(),
                type: LogEntryType.QUIT,
                channel: channel.name,
                nick,
              },
            ],
          },
        },
      };
    })
    .addCase(onChannelMessage, (state, action) => {
      const { nick, message } = action.payload;
      const channel = state.channels[action.payload.channel];

      if (!channel) {
        return state;
      }

      const isHighlight = Boolean(
        state.nick && nick !== state.nick && message.indexOf(state.nick) >= 0,
      );

      return {
        ...state,
        channels: {
          ...state.channels,
          [channel.name]: {
            ...channel,
            hasUnreadMessages: channel.name !== state.currentChannel,
            hasUnreadHighlight:
              channel.name !== state.currentChannel && isHighlight,
            log: [
              ...channel.log,
              {
                id: uuid(),
                timestamp: Date.now(),
                type: LogEntryType.MESSAGE,
                channel: channel.name,
                nick,
                message,
                isHighlight,
              },
            ],
          },
        },
      };
    })
    .addCase(onChannelUsers, (state, action) => {
      const { users } = action.payload;
      const channel = state.channels[action.payload.channel];

      if (!channel) {
        return state;
      }

      return {
        ...state,
        channels: {
          ...state.channels,
          [channel.name]: {
            ...channel,
            users,
          },
        },
      };
    })
    .addCase(onChannelError, (state, action) => {
      const channel = getCurrentChannel(state);

      if (!channel) {
        return state;
      }

      return {
        ...state,
        channels: {
          ...state.channels,
          [channel.name]: {
            ...channel,
            log: [
              ...channel.log,
              {
                id: uuid(),
                timestamp: Date.now(),
                type: LogEntryType.ERROR,
                channel: channel.name,
                message: action.payload,
              },
            ],
          },
        },
      };
    })
    .addCase(changeCurrentChannel, (state, action) => {
      const currentChannel = action.payload;
      const channel = state.channels[currentChannel];

      if (
        channel &&
        (channel.hasUnreadMessages || channel.hasUnreadHighlight)
      ) {
        return {
          ...state,
          currentChannel,
          channelListVisible: false,
          userListVisible: false,
          channels: {
            ...state.channels,
            [currentChannel]: {
              ...channel,
              hasUnreadMessages: false,
              hasUnreadHighlight: false,
            },
          },
        };
      }

      return {
        ...state,
        currentChannel,
        channelListVisible: false,
        userListVisible: false,
      };
    })
    .addCase(toggleChannelList, (state) => ({
      ...state,
      channelListVisible: !state.channelListVisible,
      userListVisible: false,
    }))
    .addCase(toggleUserList, (state) => ({
      ...state,
      channelListVisible: false,
      userListVisible: !state.userListVisible,
    }));
});
