import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./app";
import { ClientContext } from "./context";
import { initializeClient } from "./client";
import { setupStore } from "./store";

const root = createRoot(document.getElementById("root")!);
const store = setupStore();
const client = initializeClient(store);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ClientContext.Provider value={client}>
        <App />
      </ClientContext.Provider>
    </Provider>
  </StrictMode>,
);
