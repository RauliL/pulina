import * as React from 'react';

export interface Props {
  name: string;
  isActive: boolean;
  hasUnreadMessages: boolean;
  onSelect: () => void;
}

const ChannelListItem: React.SFC<Props> = (props) => (
  <li>
    <a
      href="#"
      className={`p-2 d-block text-decoration-none\
 ${props.isActive ? 'bg-white text-body' : 'text-light'}\
 ${props.hasUnreadMessages ? 'font-weight-bold' : ''}`}
      onClick={(event) => {
        event.preventDefault();
        props.onSelect();
      }}
    >
      {props.name}
    </a>
  </li>
);

export default ChannelListItem;
