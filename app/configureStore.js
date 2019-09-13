/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import createHistory from 'history/createBrowserHistory';
import { createStateSyncMiddleware } from 'redux-state-sync';

import createReducer from './reducers';
import initialStore from './constants/initialStore';

import rootSaga from './constants/rootSaga';
import rootReducer from './constants/rootReducer';
import reduxStateSyncWhiteList from './constants/reduxStateSyncWhiteList';
const sagaMiddleware = createSagaMiddleware();

const injectedReducer = createReducer(rootReducer);
// Create the store with two middlewares
// 1. sagaMiddleware: Makes redux-sagas work
// 2. routerMiddleware: Syncs the location/URL path to the state
const history = createHistory();
const reduxStateSyncConfig = {
  whitelist: reduxStateSyncWhiteList,
};
const middlewares = [
  sagaMiddleware,
  routerMiddleware(history),
  createStateSyncMiddleware(reduxStateSyncConfig),
];

const enhancers = [applyMiddleware(...middlewares)];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle, indent */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
    : compose;
/* eslint-enable */

const store = createStore(
  // createReducer(rootReducer),
  // persistedReducer,
  injectedReducer,
  fromJS(initialStore),
  composeEnhancers(...enhancers),
);

// Extensions
sagaMiddleware.run(rootSaga);
store.injectedReducers = {
  ...rootReducer,
}; // Reducer registry
// store.injectedSagas = {
//   ...rootSaga,
// }; // Saga registry

// Make reducers hot reloadable, see http://mxs.is/googmo
/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(createReducer(store.injectedReducers));
  });
}

export const persistor = persistStore(store);
export default store;
