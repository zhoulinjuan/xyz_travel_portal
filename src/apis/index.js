import Fetch from '../utils/fetch';
import api from './api.json';
// import api from './mockApi.json';

export async function requestLogin(userId) {
  const postbody = { applicantEmail: userId };
  return Fetch.post(api.getApplicant, postbody, userId);
  // return Login;
}

export async function requestAppList(search, paginator, userId) {
  const postbody = {
    ...search,
    paginator
  };
  return Fetch.post(api.getAppList, postbody, userId);
  // return applicationList;
}

export async function requestApplicationDetails(applicationId, userId) {
  return Fetch.get(api.getAppDetails + '/' + applicationId, userId);
  // return application Details;
}

export async function requestSubmitApp(appDetails, userId) {
  return Fetch.post(api.submitApp, appDetails, userId);
  // submit application;
}
