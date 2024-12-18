import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

export class User {
  public readonly id: string;
  public readonly socket: Socket;
  private channels: Set<string>;

  constructor(socket: Socket) {
    this.id = uuid();
    this.socket = socket;
    this.channels = new Set();
  }
}
