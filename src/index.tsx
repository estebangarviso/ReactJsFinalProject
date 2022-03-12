import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers';
import App from './routes/App';
import './i18n';

// Create a Redux store holding the state of your app.
const initialState = {
  user: null,
};

// Middleware you want to use by NODE_ENV:
const middlewares: Middleware[] = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// Store
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
