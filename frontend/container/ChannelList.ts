import { sortBy, values } from 'lodash';
import { connect } from 'react-redux';

import { changeCurrentChannel, toggleChannelList } from '../action';
import ChannelList, {
  DispatchProps,
  StateProps,
} from '../component/ChannelList';
import { Dispatch, State } from '../types/store';

const mapStateToProps = (state: State): StateProps => ({
  channels: sortBy(values(state.channels), 'name'),
  currentChannel: state.currentChannel,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSelectChannel(channel: string) {
    dispatch(changeCurrentChannel(channel));
  },

  onToggleChannelList() {
    dispatch(toggleChannelList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
