import { call, put } from 'redux-saga/effects';
import AuthInfoActions from '../reducers/auth-info.reducer';

// get the oauth issuer information from the backend
export function* getAuthInfo(api) {
  const authInfo = yield call(api.getOauthInfo);
  if (authInfo.ok) {
    if (authInfo.data.issuer && authInfo.data.issuer.endsWith('/')) {
      authInfo.data.issuer = authInfo.data.issuer.substring(0, authInfo.data.issuer.length - 1);
    }
    yield put(AuthInfoActions.authInfoSuccess(authInfo.data));
  } else {
    let errorMessage = authInfo.data && authInfo.data.detail ? authInfo.data.detail : 'Failed to reach backend API';
    yield put(AuthInfoActions.authInfoFailure(errorMessage));
  }
}
