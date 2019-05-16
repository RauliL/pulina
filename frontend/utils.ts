import { defaultTo, isEmpty, values } from 'lodash';

import { Channel, PulinaState } from './types';

export const getCurrentChannel = (state: PulinaState): Channel | undefined => {
  const channels = values(state.channels).sort();

  if (isEmpty(channels)) {
    return;
  }

  return defaultTo(
    channels.find((channel) => channel.name === state.currentChannel),
    channels[0],
  );
};
