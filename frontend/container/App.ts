import { connect } from 'react-redux';

import App, { StateProps } from '../component/App';
import { PulinaState } from '../types';

const mapStateToProps = (state: PulinaState): StateProps => ({
  channelListVisible: state.channelListVisible,
  userListVisible: state.userListVisible,
});

export default connect(mapStateToProps)(App);
