import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

import { Channel } from "../../../../client";
import { AppDispatch, uiSlice } from "../../../../store";
import UserListItem from "./UserListItem";

export type UserListProps = {
  channel: Channel;
};

const UserList: FunctionComponent<UserListProps> = ({ channel }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleClick = () => {
    dispatch(uiSlice.actions.toggleUserList());
  };

  return (
    <ul className="list-unstyled" style={{ overflowY: "auto" }}>
      <li className="d-lg-none navbar border-bottom">
        <span className="navbar-brand">Users on {channel.name}</span>
        <div className="float-right">
          <Button
            outline
            onClick={handleToggleClick}
            data-testid="ToggleUserListButton"
          >
            <i className="fas fa-times" />
          </Button>
        </div>
      </li>
      {channel.users
        .concat()
        .sort()
        .map((user) => (
          <UserListItem key={user.nick} user={user} />
        ))}
    </ul>
  );
};

UserList.displayName = "UserList";

export default UserList;
