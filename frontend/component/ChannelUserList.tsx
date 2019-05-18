import * as React from 'react';
import { Button } from 'reactstrap';

export interface StateProps {
  channelName?: string;
  users: string[];
}

export interface DispatchProps {
  onToggleUserList: () => void;
}

export type Props = StateProps & DispatchProps;

const ChannelUserList: React.SFC<Props> = (props) => (
  <ul className="list-unstyled" style={{ overflowY: 'auto' }}>
    <li className="d-lg-none navbar border-bottom">
      {props.channelName && <span className="navbar-brand">
        Users on {props.channelName}
      </span>}
      <div className="float-right">
        <Button outline={true} onClick={props.onToggleUserList}>
          <i className="fas fa-times"/>
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
