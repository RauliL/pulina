import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./container/App";
import { initializeSocket } from "./socket";
import { initializeStore } from "./store";

import "../../node_modules/bootstrap/scss/bootstrap.scss";

const store = initializeStore();
const socket = initializeSocket(store);
const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
);
