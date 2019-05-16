import { connect } from 'react-redux';

import NickForm, { StateProps } from '../component/NickForm';
import { PulinaState } from '../types';

const mapStateToProps = (state: PulinaState): StateProps => ({
  errorMessage: state.nickError,
});

export default connect(mapStateToProps)(NickForm);
