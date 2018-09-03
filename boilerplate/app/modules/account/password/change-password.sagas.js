import { call, put } from 'redux-saga/effects'

import ChangePasswordActions from './change-password.reducer'
import { callApi } from '../../../shared/sagas/call-api.saga'

// attempts to request a password change
export function * changePassword (api, { currentPassword, newPassword }) {
  const apiCall = call(api.changePassword, currentPassword, newPassword)
  const response = yield call(callApi, apiCall)
  // success?
  if (response.ok) {
    console.tron.log('ChangePasswordRequest - OK')
    yield put(ChangePasswordActions.changePasswordSuccess())
  } else {
    console.tron.log('ChangePassword - FAIL')
    yield put(ChangePasswordActions.changePasswordFailure('WRONG'))
  }
}
