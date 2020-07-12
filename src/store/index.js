import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { persistStore } from 'redux-persist';

export const isProduction = () =>
  process.env.NODE_ENV === 'production' &&
  process.env.GATSBY_STAGING_ENV !== 'true';

export const isDevelop = () => typeof window !== 'undefined' && !isProduction();

//initiate saga middleware
let sagaMiddleware = createSagaMiddleware();

//enable redux-devtool under develop env
export const getComposeEnhancers = () =>
  isDevelop() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

let composeEnhancers = getComposeEnhancers();

//apply middleware
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export function configureStore() {
  let store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = configureStore();
const persistor = persistStore(store);

export default { store, persistor };
