import * as types from '../actionTypes';
import { REQUEST, SUCCESS, FAILURE, createReducer } from '../utils/reduxUtils';

export const initialState = {
  user: {},
  isLoggedIn: false
};

export default createReducer(initialState, {
  [types.requestLogin[REQUEST]](state) {
    return {
      ...state,
      isLoggedIn: false
    };
  },
  [types.requestLogin[SUCCESS]](state, action) {
    return {
      ...state,
      user: action.data,
      isLoggedIn: true
    };
  },
  [types.requestLogin[FAILURE]](state) {
    return {
      ...state,
      user: {},
      isLoggedIn: false
    };
  }
});
