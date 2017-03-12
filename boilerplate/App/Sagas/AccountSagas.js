import { call, put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'

// attempts to account
export function * getAccount (api) {
  const response = yield call(api.getAccount)

  // success?
  if (response.ok) {
    console.tron.log("Account - OK")
    yield put(AccountActions.accountSuccess(response.data))
  } else {
    console.tron.log("Account - FAIL")
    yield put(AccountActions.accountFailure('WRONG'))
  }

}
