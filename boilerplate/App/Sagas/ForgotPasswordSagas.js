import { call, put } from 'redux-saga/effects'
import ForgotPasswordActions from '../Redux/ForgotPasswordRedux'

// attempts to request a password reset
export function * forgotPasswordRequest (api, { email }) {
  const response = yield call(api.forgotPasswordRequest, email)
  // success?
  if (response.ok) {
    console.tron.log("ForgotPasswordRequest - OK")
    yield put(ForgotPasswordActions.forgotPasswordSuccess(response.data))
  } else {
    console.tron.log("ForgotPassword - FAIL")
    yield put(ForgotPasswordActions.forgotPasswordFailure('WRONG'))
  }

}
