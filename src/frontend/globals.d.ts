import { Socket } from "socket.io";

declare global {
  interface Window {
    io: (url?: string) => Socket;
  }
}
