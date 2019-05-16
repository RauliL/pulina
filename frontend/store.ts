import { createStore } from 'redux';

import { reducer } from './reducer';
import { PulinaAction, PulinaState, PulinaStore } from './types';

export const initializeStore = (): PulinaStore => createStore<
  PulinaState,
  PulinaAction,
  {},
  {}
>(
  reducer,
  process.env.NODE_ENV === 'development' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() :
  undefined,
);
