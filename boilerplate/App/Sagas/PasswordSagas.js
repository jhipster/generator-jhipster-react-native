import { call, put } from 'redux-saga/effects'
import PasswordActions from '../Redux/PasswordRedux'
import { callApi } from './CallApiSaga'

// attempts to request a password reset
export function * forgotPassword (api, { email }) {
  const response = yield call(api.forgotPassword, email)
  // success?
  if (response.ok) {
    console.tron.log('ForgotPasswordRequest - OK')
    yield put(PasswordActions.forgotPasswordSuccess(response.data))
  } else {
    console.tron.log('ForgotPassword - FAIL')
    yield put(PasswordActions.forgotPasswordFailure('WRONG'))
  }
}

// attempts to request a password change
export function * changePassword (api, { password }) {
  const apiCall = call(api.changePassword, password)
  const response = yield call(callApi, apiCall)
  // success?
  if (response.ok) {
    console.tron.log('ChangePasswordRequest - OK')
    yield put(PasswordActions.changePasswordSuccess())
  } else {
    console.tron.log('ChangePassword - FAIL')
    yield put(PasswordActions.changePasswordFailure('WRONG'))
  }
}
