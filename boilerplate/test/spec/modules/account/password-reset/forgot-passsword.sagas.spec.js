import { call, put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { forgotPassword } from '../../../../../app/modules/account/password-reset/forgot-password.sagas'
import ForgotPasswordActions from '../../../../../app/modules/account/password-reset/forgot-password.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('forgot password success path', () => {
  const response = FixtureAPI.forgotPassword({ email: 'valid@gmail.com' })
  const step = stepper(forgotPassword(FixtureAPI, { email: 'valid@gmail.com' }))
  // Step 1: Hit the api
  expect(step(response)).toEqual(call(FixtureAPI.forgotPassword, 'valid@gmail.com'))
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ForgotPasswordActions.forgotPasswordSuccess()))
})

test('forgot password failure path', () => {
  const response = FixtureAPI.forgotPassword({ email: 'not-valid@gmail.com' })
  const step = stepper(forgotPassword(FixtureAPI, { email: 'not-valid@gmail.com' }))
  // Step 1: Hit the api
  expect(step(response)).toEqual(call(FixtureAPI.forgotPassword, 'not-valid@gmail.com'))
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ForgotPasswordActions.forgotPasswordFailure('WRONG')))
})
