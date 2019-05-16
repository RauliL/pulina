import { values } from 'lodash';
import { connect } from 'react-redux';

import { changeCurrentChannel } from '../action';
import ChannelList, {
  DispatchProps,
  StateProps,
} from '../component/ChannelList';
import { PulinaDispatch, PulinaState } from '../types';

const mapStateToProps = (state: PulinaState): StateProps => ({
  channels: values(state.channels),
  currentChannel: state.currentChannel,
});

const mapDispatchToProps = (dispatch: PulinaDispatch): DispatchProps => ({
  onSelectChannel(channel: string) {
    dispatch(changeCurrentChannel(channel));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
