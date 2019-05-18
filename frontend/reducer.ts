import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { v4 as uuid } from 'uuid';

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
} from './action';
import { ChannelEventType, PulinaState } from './types';
import { getCurrentChannel } from './utils';

const initialState: PulinaState = {
  channels: {},
  channelListVisible: false,
  userListVisible: false,
};

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(onNickError, (state, action) => ({
    ...state,
    nickError: action.payload,
  }))
  .caseWithAction(onNickRegistered, (state, action) => ({
    ...state,
    nick: action.payload,
    nickError: undefined,
  }))
  .caseWithAction(onJoinChannel, (state, action) => {
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
        events: [],
        hasUnreadMessages: false,
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
          events: [
            ...channel.events,
            {
              id: uuid(),
              timestamp: Date.now(),
              type: ChannelEventType.JOIN,
              channel: channel.name,
              nick,
            },
          ],
        },
      },
    };
  })
  .caseWithAction(onPartChannel, (state, action) => {
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
          events: [
            ...channel.events,
            {
              id: uuid(),
              timestamp: Date.now(),
              type: ChannelEventType.PART,
              channel: channel.name,
              nick,
            },
          ],
        },
      },
    };
  })
  .caseWithAction(onQuitChannel, (state, action) => {
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
          events: [
            ...channel.events,
            {
              id: uuid(),
              timestamp: Date.now(),
              type: ChannelEventType.QUIT,
              channel: channel.name,
              nick,
            },
          ],
        },
      },
    };
  })
  .caseWithAction(onChannelMessage, (state, action) => {
    const { nick, message } = action.payload;
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
          hasUnreadMessages: channel.name !== state.currentChannel,
          events: [
            ...channel.events,
            {
              id: uuid(),
              timestamp: Date.now(),
              type: ChannelEventType.MESSAGE,
              channel: channel.name,
              nick,
              message,
            },
          ],
        },
      },
    };
  })
  .caseWithAction(onChannelUsers, (state, action) => {
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
  .caseWithAction(onChannelError, (state, action) => {
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
          events: [
            ...channel.events,
            {
              id: uuid(),
              timestamp: Date.now(),
              type: ChannelEventType.ERROR,
              channel: channel.name,
              message: action.payload,
            },
          ],
        },
      },
    };
  })
  .caseWithAction(changeCurrentChannel, (state, action) => {
    const currentChannel = action.payload;
    const channel = state.channels[currentChannel];

    if (channel && channel.hasUnreadMessages) {
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
  .case(toggleChannelList, (state) => ({
    ...state,
    channelListVisible: !state.channelListVisible,
    userListVisible: false,
  }))
  .case(toggleUserList, (state) => ({
    ...state,
    channelListVisible: false,
    userListVisible: !state.userListVisible,
  }));
