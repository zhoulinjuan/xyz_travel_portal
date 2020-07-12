import { combineReducers } from 'redux';
import login from './loginReducer';
import reducers from './reducers';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'login',
  storage: storageSession
};

const rootReducer = combineReducers({
  login: persistReducer(persistConfig, login),
  store: reducers
});

export default rootReducer;
