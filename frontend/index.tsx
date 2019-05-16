import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './component/App';
import { initializeSocket } from './socket';
import { initializeStore } from './store';

import '../node_modules/bootstrap/scss/bootstrap.scss';

const store = initializeStore();
const socket = initializeSocket(store);

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket}/>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
