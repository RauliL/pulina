import { createStore } from 'redux';

import { reducer } from './reducer';
import { Action, State, Store } from './types/store';

export const initializeStore = (): Store => createStore<State, Action, {}, {}>(
  reducer,
  process.env.NODE_ENV === 'development' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() :
  undefined,
);
