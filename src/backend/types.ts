import { Socket } from "socket.io";

export type Connection = {
  id: string;
  socket: Socket;
  nick?: string;
  channels: Set<string>;
};

export type Channel = {
  name: string;
  users: Set<string>;
};
