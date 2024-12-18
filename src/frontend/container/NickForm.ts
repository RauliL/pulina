import { connect } from "react-redux";

import NickForm, { StateProps } from "../component/NickForm";
import { State } from "../types/store";

const mapStateToProps = (state: State): StateProps => ({
  errorMessage: state.nickError,
});

export default connect(mapStateToProps)(NickForm);
