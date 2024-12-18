import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type Props = {
  name: string;
  isActive: boolean;
  hasUnreadMessages: boolean;
  hasUnreadHighlight: boolean;
  onSelect: () => void;
};

const getLinkClassName = (props: Props) =>
  classNames("p-2", "d-block", "text-secondary", "text-decoration-none", {
    "bg-white": props.isActive,
    "text-body": props.isActive,
  });

const getChannelNameClassName = (props: Props) =>
  classNames({
    "font-weight-bold": props.hasUnreadMessages || props.hasUnreadHighlight,
    "text-body": props.isActive,
    "text-white":
      !props.isActive && props.hasUnreadMessages && !props.hasUnreadHighlight,
    "text-warning": !props.isActive && props.hasUnreadHighlight,
    "text-secondary": !props.isActive && !props.hasUnreadMessages,
  });

const ChannelListItem: FunctionComponent<Props> = (props) => (
  <li>
    <a
      href="#"
      className={getLinkClassName(props)}
      onClick={(event) => {
        event.preventDefault();
        props.onSelect();
      }}
    >
      # &nbsp;
      <span className={getChannelNameClassName(props)}>
        {props.name.substring(1)}
      </span>
    </a>
  </li>
);

export default ChannelListItem;
