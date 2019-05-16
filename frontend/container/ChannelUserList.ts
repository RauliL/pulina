import { connect } from 'react-redux';

import ChannelUserList, { StateProps } from '../component/ChannelUserList';
import { PulinaState } from '../types';
import { getCurrentChannel } from '../utils';

const mapStateToProps = (state: PulinaState): StateProps => {
  const currentChannel = getCurrentChannel(state);
  let users: string[] | undefined;

  if (currentChannel) {
    users = currentChannel.users.sort();
  }

  return { users };
};

export default connect(mapStateToProps)(ChannelUserList);
