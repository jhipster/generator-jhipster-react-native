import { call, put } from 'redux-saga/effects'

import ForgotPasswordActions from './forgot-password.reducer'

// attempts to request a password reset
export function * forgotPassword (api, { email }) {
  const response = yield call(api.forgotPassword, email)
  // success?
  if (response.ok) {
    console.tron.log('ForgotPasswordRequest - OK')
    yield put(ForgotPasswordActions.forgotPasswordSuccess(response.data))
  } else {
    console.tron.log('ForgotPassword - FAIL')
    yield put(ForgotPasswordActions.forgotPasswordFailure('WRONG'))
  }
}
