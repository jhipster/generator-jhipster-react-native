import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { forgotPassword, changePassword } from '../../App/Sagas/PasswordSagas'
import PasswordActions from '../../App/Redux/PasswordRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('forgot password success path', () => {
  const response = FixtureAPI.forgotPassword({email: 'valid@gmail.com'})
  const step = stepper(forgotPassword(FixtureAPI, {email: 'valid@gmail.com'}))
  // Step 1: Hit the api
  expect(step(response)).toEqual(call(FixtureAPI.forgotPassword, 'valid@gmail.com'))
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PasswordActions.forgotPasswordSuccess()))
})

test('forgot password failure path', () => {
  const response = FixtureAPI.forgotPassword({email: 'not-valid@gmail.com'})
  const step = stepper(forgotPassword(FixtureAPI, {email: 'not-valid@gmail.com'}))
  // Step 1: Hit the api
  expect(step(response)).toEqual(call(FixtureAPI.forgotPassword, 'not-valid@gmail.com'))
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PasswordActions.forgotPasswordFailure('WRONG')))
})

test('change password success path', () => {
  const response = FixtureAPI.changePassword({password: 'valid-password'})
  const step = stepper(changePassword(FixtureAPI, {password: 'valid-password'}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PasswordActions.changePasswordSuccess()))
})

test('change password failure path', () => {
  const response = FixtureAPI.changePassword({password: 'not-valid-password'})
  const step = stepper(changePassword(FixtureAPI, {password: 'not-valid-password'}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PasswordActions.changePasswordFailure('WRONG')))
})
