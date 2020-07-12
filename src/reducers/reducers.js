import * as types from '../actionTypes';
import { REQUEST, SUCCESS, FAILURE, createReducer } from '../utils/reduxUtils';

export const initialState = {
  applicationList: [],
  paginator: {},
  isLoadingAppList: false,
  applicationDetails: {},
  isLoadingAppDetails: false,
  isSubmitApp: false
};

export default createReducer(initialState, {
  //get app list reducers
  [types.requestAppList[REQUEST]](state) {
    return {
      ...state,
      isLoadingAppList: true
    };
  },
  [types.requestAppList[SUCCESS]](state, action) {
    return {
      ...state,
      applicationList: action.data,
      pagination: action.paginator,
      isLoadingAppList: false
    };
  },
  [types.requestAppList[FAILURE]](state) {
    return {
      ...state,
      applicationList: {},
      isLoadingAppList: false
    };
  },

  //get app details reducers
  [types.requestApplicationDetails[REQUEST]](state) {
    return {
      ...state,
      isLoadingAppDetails: true
    };
  },
  [types.requestApplicationDetails[SUCCESS]](state, action) {
    return {
      ...state,
      applicationDetails: action.data,
      isLoadingAppDetails: false
    };
  },
  [types.requestApplicationDetails[FAILURE]](state) {
    return {
      ...state,
      applicationDetails: {},
      isLoadingAppDetails: false
    };
  },

  //submit application reducers
  [types.requestSubmitApp[SUCCESS]](state) {
    return {
      ...state,
      isSubmitApp: true
    };
  }
});
