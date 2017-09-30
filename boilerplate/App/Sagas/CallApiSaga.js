import { put, take } from 'redux-saga/effects'
import { Actions as NavigationActions } from 'react-native-router-flux'

// this saga is used for showing the LoginScreen when a 401 error is received
// if login is successful, it will reattempt the request
// if login fails, it will return the error
export function * callApi (apiCall) {
  const response = yield apiCall
  if (!isBadToken(response)) {
    return response
  }
  // this triggers your UI to show a login form
  yield put({ type: 'RELOGIN' })
  NavigationActions.login()
  const action = yield take(['RELOGIN_OK', 'RELOGIN_ABORT'])

  if (action.type === 'RELOGIN_ABORT') {
    return response
  }

  // this re-calls the api with the new authorization
  return yield apiCall
}

function isBadToken (resp) {
  return resp.status === 401
}
