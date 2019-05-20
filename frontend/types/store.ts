import {
  AnyAction,
  Dispatch as ReduxDispatch,
  Store as ReduxStore,
} from 'redux';

import { Channel } from './channel';

export interface State {
  /** Currently used nickname. */
  nick?: string;
  /** Nickname related error reported by the server. */
  nickError?: string;
  /** Channels which the user currently is on. */
  channels: { [name: string]: Channel };
  /** Name of the currently viewed channel. */
  currentChannel?: string;
  /** Whether channel list should be visible or not. */
  channelListVisible: boolean;
  /** Whether user list should be visible or not. */
  userListVisible: boolean;
}

export type Action = AnyAction;
export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<State, Action>;
