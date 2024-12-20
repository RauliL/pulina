import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { clientSlice, uiSlice } from "./slices";

export { ClientState, UIState, clientSlice, uiSlice } from "./slices";

const rootReducer = combineReducers({
  client: clientSlice.reducer,
  ui: uiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    preloadedState,
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
