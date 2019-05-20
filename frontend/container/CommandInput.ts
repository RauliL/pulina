import { connect } from 'react-redux';

import CommandInput, { StateProps } from '../component/CommandInput';
import { State } from '../types/store';
import { getCurrentChannel } from '../utils';

const mapStateToProps = (state: State): StateProps => {
  const currentChannel = getCurrentChannel(state);
  let users: string[] | undefined;

  if (currentChannel) {
    users = currentChannel.users;
  }

  return {
    nick: state.nick,
    users
  };
};

export default connect(mapStateToProps)(CommandInput);
