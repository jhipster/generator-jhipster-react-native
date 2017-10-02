import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { register } from '../../App/Sagas/RegisterSagas'
import RegisterActions from '../../App/Redux/RegisterRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('register success path', () => {
  const response = FixtureAPI.register({user: 'user'})
  const step = stepper(register(FixtureAPI, {user: 'user'}))
  // Call the API with a successful registration
  expect(step({user: 'user'})).toEqual(call(FixtureAPI.register, 'user'))
  // Finish the saga with success
  expect(step(response)).toEqual(put(RegisterActions.registerSuccess()))
})

test('register failure path', () => {
  const response = FixtureAPI.register({user: 'user-bad'})
  const step = stepper(register(FixtureAPI, {user: 'user-bad'}))
  // Call the API with a failing registration
  expect(step({user: 'user-bad-bad'})).toEqual(call(FixtureAPI.register, 'user-bad'))
  // Finish the saga with failure
  expect(step(response)).toEqual(put(RegisterActions.registerFailure(response.data)))
})
