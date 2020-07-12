import { REQUEST, SUCCESS, FAILURE, createAction } from '../utils/reduxUtils';
import * as types from '../actionTypes';

export const requestLogin = {
  request: (userId) => createAction(types.requestLogin[REQUEST], { userId }),
  success: (data) => createAction(types.requestLogin[SUCCESS], { data }),
  failure: (status) => createAction(types.requestLogin[FAILURE], { status })
};

export const requestAppList = {
  request: (search, paginator, userId) =>
    createAction(types.requestAppList[REQUEST], { search, paginator, userId }),
  success: (data, paginator) =>
    createAction(types.requestAppList[SUCCESS], { data, paginator }),
  failure: (status) => createAction(types.requestAppList[FAILURE], { status })
};

export const requestApplicationDetails = {
  request: (applicationId, userId) =>
    createAction(types.requestApplicationDetails[REQUEST], {
      applicationId,
      userId
    }),
  success: (data) =>
    createAction(types.requestApplicationDetails[SUCCESS], { data }),
  failure: (status) =>
    createAction(types.requestApplicationDetails[FAILURE], { status })
};

export const requestSubmitApp = {
  request: (appDetails, userId) =>
    createAction(types.requestSubmitApp[REQUEST], { appDetails, userId }),
  success: (data) => createAction(types.requestSubmitApp[SUCCESS], { data }),
  failure: (status) => createAction(types.requestSubmitApp[FAILURE], { status })
};
