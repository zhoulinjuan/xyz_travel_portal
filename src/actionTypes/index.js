import { createRequestType } from '../utils/reduxUtils';

export const requestLogin = createRequestType('REQUEST_USER_LOGIN');

export const requestAppList = createRequestType('REQUEST_APPLICATION_LIST');

export const requestApplicationDetails = createRequestType(
  'REQUEST_APPLICATION_DETAILS'
);

export const requestSubmitApp = createRequestType('REQUEST_SUBMIT_APPLICATION');
