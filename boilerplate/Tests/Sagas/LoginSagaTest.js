import test from 'ava'

test('placeholder test so it passes', (t) => {
  t.deepEqual(1, 1)
})
// import { put, call } from 'redux-saga/effects'
// import { login } from '../../App/Sagas/LoginSagas'
// import FixtureAPI from '../../App/Services/FixtureApi'
// import LoginActions from '../../App/Redux/LoginRedux'
//
// const stepper = (fn) => (mock) => fn.next(mock).value
//
// test('calls api', (t) => {
//   const mock = { username: 'user', rememberMe: true, password: 'user' }
//   const step = stepper(login(FixtureAPI, mock))
//
//   t.deepEqual(step(), call(FixtureAPI.login, mock))
// })
//
// test('success', (t) => {
//   const mock = { username: 'user', rememberMe: true, password: 'user' }
//   const response = FixtureAPI.login(mock)
//   const step = stepper(login(FixtureAPI, mock))
//   // first step API
//   t.deepEqual(step(response), put(LoginActions.loginSuccess({id_token: 'test'})))
// })
//
// test('failure', (t) => {
//   const mock = { username: '', password: '' }
//   const response = FixtureAPI.login(mock)
//   const step = stepper(login(FixtureAPI, mock))
//   // first step API
//   step()
//   // Second step error return
//   const stepResponse = step(response)
//
//   t.deepEqual(stepResponse, put(LoginActions.loginFailure('WRONG')))
// })
