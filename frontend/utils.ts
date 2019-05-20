import { defaultTo, isEmpty, values } from 'lodash';

import { Channel } from './types/channel';
import { State } from './types/store';

export const getCurrentChannel = (state: State): Channel | undefined => {
  const channels = values(state.channels).sort();

  if (isEmpty(channels)) {
    return;
  }

  return defaultTo(
    channels.find((channel) => channel.name === state.currentChannel),
    channels[0],
  );
};
