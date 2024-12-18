import { connect } from "react-redux";

import { toggleUserList } from "../action";
import ChannelUserList, {
  DispatchProps,
  StateProps,
} from "../component/ChannelUserList";
import { Dispatch, State } from "../types/store";
import { getCurrentChannel } from "../utils";

const mapStateToProps = (state: State): StateProps => {
  const currentChannel = getCurrentChannel(state);
  let channelName: string | undefined;
  let users: string[] | undefined;

  if (currentChannel) {
    channelName = currentChannel.name;
    users = currentChannel.users.sort();
  } else {
    users = [];
  }

  return { channelName, users };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onToggleUserList() {
    dispatch(toggleUserList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelUserList);
