import { call, put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { changePassword } from '../../../../../app/modules/account/password/change-password.sagas'
import ChangePasswordActions from '../../../../../app/modules/account/password/change-password.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('change password success path', () => {
  const response = FixtureAPI.changePassword({password: 'valid-password'})
  const step = stepper(changePassword(FixtureAPI, {password: 'valid-password'}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChangePasswordActions.changePasswordSuccess()))
})

test('change password failure path', () => {
  const response = FixtureAPI.changePassword({password: 'not-valid-password'})
  const step = stepper(changePassword(FixtureAPI, {password: 'not-valid-password'}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChangePasswordActions.changePasswordFailure('WRONG')))
})
