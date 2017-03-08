import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { username, password }) {

  const authObj = {
    username: username,
    password: password,
    rememberMe: true
  }
  const response = yield call(api.login, authObj)

  // success?
  if (response.ok) {
    console.tron.log("Login - OK")
    yield put(LoginActions.loginSuccess(response.data))
  } else {
    console.tron.log("Login - FAIL")
    yield put(LoginActions.loginFailure('WRONG'))
  }

}
