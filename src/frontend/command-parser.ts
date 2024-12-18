import {
  ClientEvent,
  ClientEventType,
  ClientParticipancyEvent,
  ClientTopicEvent,
  isBlank,
  isValidChannel,
} from "../common";
import { Channel } from "./client";

const parseJoinCommand = (input: string): Promise<ClientParticipancyEvent> =>
  new Promise((resolve, reject) => {
    let channelName: string;

    if (isBlank(input)) {
      reject("Missing channel name.");
      return;
    }

    channelName = input.trim();

    if (!isValidChannel(channelName)) {
      reject("Invalid channel name.");
      return;
    }

    resolve({
      type: ClientEventType.JOIN,
      channel: channelName,
    });
  });

const parsePartCommand = (
  channel: Channel,
  input: string,
): Promise<ClientParticipancyEvent> =>
  new Promise((resolve, reject) => {
    let channelName: string;

    if (isBlank(input)) {
      channelName = channel.name;
    } else {
      channelName = input.trim();
    }

    if (!isValidChannel(channelName)) {
      reject("Invalid channel name.");
      return;
    }

    resolve({
      type: ClientEventType.PART,
      channel: channelName,
    });
  });

const parseTopicCommand = (
  channel: Channel,
  input: string,
): Promise<ClientTopicEvent> =>
  new Promise((resolve, reject) => {
    let channelName: string;
    const match = /^#\S*/.exec(input);

    if (match) {
      channelName = match[0];
      input = input.substring(channelName.length).trim();
    } else {
      channelName = channel.name;
    }

    if (!isValidChannel(channelName)) {
      reject("Invalid channel name.");
      return;
    }

    if (isBlank(input)) {
      reject("Missing topic.");
      return;
    }

    resolve({
      type: ClientEventType.TOPIC,
      channel: channelName,
      topic: input,
    });
  });

/**
 * Parses an user input into a client command.
 *
 * @param channel Current channel
 * @param input Input coming from the user.
 */
export const parseCommand = (
  channel: Channel,
  input: string,
): Promise<ClientEvent> => {
  // Actual commands begin with a slash, so first look for that.
  if (input[0] !== "/") {
    // Assume it's a message being sent to the channel.
    return Promise.resolve({
      type: ClientEventType.MESSAGE,
      message: input,
      target: channel.name,
    });
  }

  // Slash with a following whitespace and another slash is a method for
  // sending messages beginning with a slash to the channel.
  if (/^\/\s\/.+/.test(input)) {
    return Promise.resolve({
      type: ClientEventType.MESSAGE,
      message: input.substring(2),
      target: channel.name,
    });
  }

  if (/^\/join(\s|$)/i.test(input)) {
    return parseJoinCommand(input.substring(6).trim());
  }

  if (/^\/part(\s|$)/i.test(input)) {
    return parsePartCommand(channel, input.substring(6).trim());
  }

  if (/^\/topic(\s|$)/i.test(input)) {
    return parseTopicCommand(channel, input.substring(7).trim());
  }

  return Promise.reject("Unknown command.");
};
