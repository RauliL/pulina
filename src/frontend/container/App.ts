import { connect } from "react-redux";

import App, { StateProps } from "../component/App";
import { State } from "../types/store";

const mapStateToProps = (state: State): StateProps => ({
  channelListVisible: state.channelListVisible,
  userListVisible: state.userListVisible,
});

export default connect(mapStateToProps)(App);
