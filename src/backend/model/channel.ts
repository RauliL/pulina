export class Channel {
  private name: string;
  private topic: string | null;
  private users: Set<string>;

  constructor(name: string) {
    this.name = name;
    this.topic = null;
    this.users = new Set();
  }

  toString(): string {
    return this.name;
  }
}
