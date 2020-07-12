import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { REQUEST } from '../utils/reduxUtils';
import * as apis from '../apis';
import * as actions from '../actions';
// import * as msgs from '@/actions/SnackbarActions';
// import { navigate } from 'gatsby';

const responceCheck = (data) => {
  if (data.status.code === '00-0000') {
    return true;
  } else {
    throw new Error(data.status.message || data.message || data);
  }
};

function* fetchLogin({ userId }) {
  try {
    const result = yield call(apis.requestLogin, userId);
    yield call(responceCheck, result);
    yield put(actions.requestLogin.success(result.data[0]));
  } catch (error) {
    // yield put(msgs.danger('GetUserList-' + error));
    yield put(actions.requestLogin.failure(error));
  }
}

function* fetchAppList({ search, paginator, userId }) {
  try {
    const result = yield call(apis.requestAppList, search, paginator, userId);
    yield call(responceCheck, result);
    yield put(actions.requestAppList.success(result.data, result.paginator));
  } catch (error) {
    // yield put(msgs.danger('GetUserList-' + error));
    yield put(actions.requestAppList.failure(error));
  }
}

function* fetchApplicationDetails({ applicationId, userId }) {
  try {
    const result = yield call(
      apis.requestApplicationDetails,
      applicationId,
      userId
    );
    yield call(responceCheck, result);
    yield put(actions.requestApplicationDetails.success(result.data));
  } catch (error) {
    // yield put(msgs.danger('GetUserList-' + error));
    yield put(actions.requestApplicationDetails.failure(error));
  }
}

function* fetchSubmitApp({ appDetails, userId }) {
  try {
    const result = yield call(apis.requestSubmitApp, appDetails, userId);
    yield call(responceCheck, result);
    yield put(actions.requestSubmitApp.success(result.data));
  } catch (error) {
    // yield put(msgs.danger('GetUserList-' + error));
    yield put(actions.requestSubmitApp.failure(error));
  }
}

export default function* Sagas() {
  yield takeLatest(actionTypes.requestAppList[REQUEST], fetchAppList);
  yield takeLatest(actionTypes.requestLogin[REQUEST], fetchLogin);
  yield takeLatest(
    actionTypes.requestApplicationDetails[REQUEST],
    fetchApplicationDetails
  );
  yield takeLatest(actionTypes.requestSubmitApp[REQUEST], fetchSubmitApp);
}
