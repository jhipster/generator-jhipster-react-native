import { call, put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'
import { callApi } from './CallApiSaga'

// attempts to account
export function * getAccount (api) {
  const response = yield call(api.getAccount)

  // success?
  if (response.ok) {
    console.tron.log('Account - OK')
    yield put(AccountActions.accountSuccess(response.data))
  } else {
    console.tron.log('Account - FAIL')
    yield put(AccountActions.accountFailure('WRONG'))
  }
}

// attempts to update account settings
export function * updateAccount (api, action) {
  const { account } = action
  const apiCall = call(api.updateAccount, account)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    console.tron.log('AccountUpdate - OK')
    yield put(AccountActions.accountUpdateSuccess())
  } else {
    console.tron.log('AccountUpdate - FAIL')
    yield put(AccountActions.accountFailure('WRONG'))
  }
}
