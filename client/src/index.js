/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from './providers/StoreProvider';
import * as serviceWorker from './serviceWorker';

import App from './App';
import './index.css';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
