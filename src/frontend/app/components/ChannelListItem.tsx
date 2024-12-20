import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type ChannelListItemProps = {
  hasUnreadHighlights: boolean;
  hasUnreadMessages: boolean;
  isActive: boolean;
  name: string;
  onSelect: () => void;
};

const getLinkClassName = (props: ChannelListItemProps) =>
  classNames("p-2", "d-block", "text-secondary", "text-decoration-none", {
    "bg-white": props.isActive,
    "text-body": props.isActive,
  });

const getChannelNameClassName = (props: ChannelListItemProps) =>
  classNames({
    "font-weight-bold": props.hasUnreadMessages || props.hasUnreadHighlights,
    "text-body": props.isActive,
    "text-white":
      !props.isActive && props.hasUnreadMessages && !props.hasUnreadHighlights,
    "text-warning": !props.isActive && props.hasUnreadHighlights,
    "text-secondary": !props.isActive && !props.hasUnreadMessages,
  });

const ChannelListItem: FunctionComponent<ChannelListItemProps> = (props) => (
  <li data-testid="ChannelListItem">
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

ChannelListItem.displayName = "ChannelListItem";

export default ChannelListItem;
