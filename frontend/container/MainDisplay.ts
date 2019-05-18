import { connect } from 'react-redux';

import { onChannelError, toggleChannelList, toggleUserList } from '../action';
import MainDisplay, {
  DispatchProps,
  StateProps,
} from '../component/MainDisplay';
import { PulinaDispatch, PulinaState } from '../types';
import { getCurrentChannel } from '../utils';

const mapStateToProps = (state: PulinaState): StateProps => ({
  isNickRegistered: state.nick != null,
  currentChannel: getCurrentChannel(state),
});

const mapDispatchToProps = (dispatch: PulinaDispatch): DispatchProps => ({
  onCommandError(errorMessage: string) {
    dispatch(onChannelError(errorMessage));
  },

  onToggleChannelList() {
    dispatch(toggleChannelList());
  },

  onToggleUserList() {
    dispatch(toggleUserList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDisplay);
