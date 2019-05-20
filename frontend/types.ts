import { AnyAction, Dispatch, Store } from 'redux';

/**
 * Enumeration of different channel events.
 */
export enum ChannelEventType {
  /** User has joined the channel. */
  JOIN = 'join',
  /** User has left the channel. */
  PART = 'part',
  /** User has quit the chat. */
  QUIT = 'quit',
  /** User sent a message. */
  MESSAGE = 'message',
  /** An error occurred. */
  ERROR = 'error',
}

export interface ChannelEvent {
  /** Unique identifier of the event. */
  id: string;
  /** Timestamp when the event occurred. */
  timestamp: number;
  /** Type of the event. */
  type: ChannelEventType;
  /** Name of the channel. */
  channel: string;
}

export interface ChannelJoinEvent extends ChannelEvent {
  /** Type of the event. */
  type: ChannelEventType.JOIN;
  /** Nickname of the user who joined. */
  nick: string;
}

export interface ChannelPartEvent extends ChannelEvent {
  /** Type of the event. */
  type: ChannelEventType.PART;
  /** Nickname of the user who left. */
  nick: string;
}

export interface ChannelQuitEvent extends ChannelEvent {
  /** Type of the event. */
  type: ChannelEventType.QUIT;
  /** Nickname of the user who quit. */
  nick: string;
}

export interface ChannelMessageEvent extends ChannelEvent {
  /** Type of the event. */
  type: ChannelEventType.MESSAGE;
  /** Nickname of the user who sent the message. */
  nick: string;
  /** The message that was sent. */
  message: string;
  /** Whether the message should be highlighted or not. */
  isHighlight: boolean;
}

export interface ChannelErrorEvent extends ChannelEvent {
  /** Type of the event. */
  type: ChannelEventType.ERROR;
  /** The error message. */
  message: string;
}

export interface Channel {
  /** Name of the channel. */
  name: string;
  /** List of nicknames on the channel. */
  users: string[];
  /** List of events that occurred on the channel. */
  events: ChannelEvent[];
  /** Whether the channel has unread messages or not. */
  hasUnreadMessages: boolean;
  /** Whether the channel has unread highlight or not. */
  hasUnreadHighlight: boolean;
}

export interface PulinaState {
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

export type PulinaAction = AnyAction;

export type PulinaDispatch = Dispatch<PulinaAction>;

export type PulinaStore = Store<PulinaState, PulinaAction>;
