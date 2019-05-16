import { Socket } from 'socket.io';

export interface Connection {
  id: string;
  socket: Socket;
  nick?: string;
  channels: Set<string>;
}

export interface Channel {
  name: string;
  users: Set<string>;
}
