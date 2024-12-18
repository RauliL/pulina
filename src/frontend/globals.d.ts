interface Socket {
  on: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
  close: () => void;
}

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  io: (url?: string) => Socket;
}
