import * as React from 'react';

export interface StateProps {
  users?: string[];
}

export type Props = StateProps;

const ChannelUserList: React.SFC<Props> = ({ users }) => (
  <ul className="list-unstyled" style={{ overflowY: 'auto' }}>
    {users && users.sort().map((user) => (
      <li className="p-2 border-bottom" key={user}>
        {user}
      </li>
    ))}
  </ul>
);

export default ChannelUserList;
