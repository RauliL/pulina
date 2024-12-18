import { connect } from "react-redux";

import { onChannelError, toggleChannelList, toggleUserList } from "../action";
import MainDisplay, {
  DispatchProps,
  StateProps,
} from "../component/MainDisplay";
import { Dispatch, State } from "../types/store";
import { getCurrentChannel } from "../utils";

const mapStateToProps = (state: State): StateProps => ({
  isNickRegistered: state.nick != null,
  currentChannel: getCurrentChannel(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
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
