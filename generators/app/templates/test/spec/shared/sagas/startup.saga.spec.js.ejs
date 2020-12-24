import { put } from 'redux-saga/effects'

import { startup } from '../../../../app/shared/sagas/startup.saga'
import LoginActions from '../../../../app/modules/login/login.reducer'
import AccountActions from '../../../../app/shared/reducers/account.reducer'
import AppStateActions from '../../../../app/shared/reducers/app-state.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('calls the right actions on startup', () => {
  const step = stepper(startup())
  expect(step()).toEqual(put(LoginActions.loginLoad()))
  expect(step()).toEqual(put(AccountActions.accountRequest()))
  expect(step()).toEqual(put(AppStateActions.setRehydrationComplete()))
})

test('calls the right actions when console.tron is null', () => {
  console.tron = null
  const step = stepper(startup())
  expect(step()).toEqual(put(LoginActions.loginLoad()))
  expect(step()).toEqual(put(AccountActions.accountRequest()))
  expect(step()).toEqual(put(AppStateActions.setRehydrationComplete()))
})
