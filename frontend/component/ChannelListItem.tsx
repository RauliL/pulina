import * as React from 'react';

export interface Props {
  name: string;
  isActive: boolean;
  onSelect: () => void;
}

const ChannelListItem: React.SFC<Props> = ({ name, isActive, onSelect }) => (
  <li>
    <a
      href="#"
      className={`p-2 d-block text-decoration-none\
 ${isActive ? 'bg-white text-body' : 'text-light'}`}
      onClick={(event) => {
        event.preventDefault();
        onSelect();
      }}
    >
      {name}
    </a>
  </li>
);

export default ChannelListItem;
