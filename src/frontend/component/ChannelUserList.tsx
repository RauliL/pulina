import React, { FunctionComponent } from "react";
import { Button } from "reactstrap";

export type StateProps = {
  channelName?: string;
  users: string[];
};

export type DispatchProps = {
  onToggleUserList: () => void;
};

export type Props = StateProps & DispatchProps;

const ChannelUserList: FunctionComponent<Props> = (props) => (
  <ul className="list-unstyled" style={{ overflowY: "auto" }}>
    <li className="d-lg-none navbar border-bottom">
      {props.channelName && (
        <span className="navbar-brand">Users on {props.channelName}</span>
      )}
      <div className="float-right">
        <Button outline={true} onClick={props.onToggleUserList}>
          <i className="fas fa-times" />
        </Button>
      </div>
    </li>
    {props.users.map((user) => (
      <li className="p-2 border-bottom" key={user}>
        {user}
      </li>
    ))}
  </ul>
);

export default ChannelUserList;
