import { defaultTo, isEmpty, sortBy, values } from "lodash";

import { Channel } from "./types/channel";
import { State } from "./types/store";

export const getCurrentChannel = (state: State): Channel | undefined => {
  const channels = sortBy(values(state.channels), "name");

  if (isEmpty(channels)) {
    return;
  }

  return defaultTo(
    channels.find((channel) => channel.name === state.currentChannel),
    channels[0],
  );
};
