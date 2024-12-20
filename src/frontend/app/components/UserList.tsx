import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

import { useCurrentChannel } from "../../hooks";
import { AppDispatch, uiSlice } from "../../store";

const UserList: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentChannel = useCurrentChannel();

  const handleToggleClick = () => {
    dispatch(uiSlice.actions.toggleUserList());
  };

  return (
    <ul className="list-unstyled" style={{ overflowY: "auto" }}>
      <li className="d-lg-none navbar border-bottom">
        {currentChannel && (
          <span className="navbar-brand">Users on {currentChannel.name}</span>
        )}
        <div className="float-right">
          <Button outline={true} onClick={handleToggleClick}>
            <i className="fas fa-times" />
          </Button>
        </div>
      </li>
      {currentChannel?.users
        .concat()
        .sort()
        .map((user) => (
          <li className="p-2 border-bottom" key={user.nick}>
            {user.isOperator && "@"}
            {user.nick}
          </li>
        ))}
    </ul>
  );
};

UserList.displayName = "UserList";

export default UserList;
