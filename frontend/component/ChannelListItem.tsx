import classNames from 'classnames';
import * as React from 'react';

export interface Props {
  name: string;
  isActive: boolean;
  hasUnreadMessages: boolean;
  onSelect: () => void;
}

const getLinkClassName = (props: Props) => classNames(
  'p-2',
  'd-block',
  'text-secondary',
  'text-decoration-none',
  {
    'bg-white': props.isActive,
    'text-body': props.isActive,
  },
);

const getChannelNameClassName = (props: Props) => classNames({
  'font-weight-bold': props.hasUnreadMessages,
  'text-body': props.isActive,
  'text-white': !props.isActive && props.hasUnreadMessages,
  'text-secondary': !props.isActive && !props.hasUnreadMessages,
});

const ChannelListItem: React.SFC<Props> = (props) => (
  <li>
    <a
      href="#"
      className={getLinkClassName(props)}
      onClick={(event) => {
        event.preventDefault();
        props.onSelect();
      }}
    >
      #
      &nbsp;
      <span className={getChannelNameClassName(props)}>
        {props.name.substring(1)}
      </span>
    </a>
  </li>
);

export default ChannelListItem;
