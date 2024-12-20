import React, { FunctionComponent } from "react";

import { ChannelUser } from "../../../../client";

export type UserListItemProps = {
  user: ChannelUser;
};

const UserListItem: FunctionComponent<UserListItemProps> = ({
  user: { isOperator, nick },
}) => (
  <li data-testid="UserListItem">
    <a
      href="#"
      className="p-2 d-block text-secondary text-decoration-none"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {isOperator && <>@ &nbsp;</>}
      {nick}
    </a>
  </li>
);

UserListItem.displayName = "UserListItem";

export default UserListItem;
