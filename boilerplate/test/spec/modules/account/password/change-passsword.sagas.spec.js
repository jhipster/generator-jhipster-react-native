import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { changePassword } from '../../../../../app/modules/account/password/change-password.sagas'
import ChangePasswordActions from '../../../../../app/modules/account/password/change-password.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('change password success path', () => {
  const response = FixtureAPI.changePassword({ currentPassword: 'valid-password', newPassword: 'valid-password' })
  const step = stepper(changePassword(FixtureAPI, { currentPassword: 'valid-password', newPassword: 'valid-password' }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChangePasswordActions.changePasswordSuccess()))
})

test('change password failure path', () => {
  const response = FixtureAPI.changePassword({ currentPassword: 'invalid-password', newPassword: 'invalid-password' })
  const step = stepper(changePassword(FixtureAPI, { currentPassword: 'invalid-password', newPassword: 'invalid-password' }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChangePasswordActions.changePasswordFailure('WRONG')))
})
