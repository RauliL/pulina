import { LogEntry } from "./log";

export interface Channel {
  /** Name of the channel. */
  name: string;
  /** List of nicknames on the channel. */
  users: string[];
  /** Log entries that occurred on the channel. */
  log: LogEntry[];
  /** Whether the channel has unread messages or not. */
  hasUnreadMessages: boolean;
  /** Whether the channel has unread highlight or not. */
  hasUnreadHighlight: boolean;
}
