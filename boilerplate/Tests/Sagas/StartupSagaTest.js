import test from 'ava'
import { select, put } from 'redux-saga/effects'
import { selectAuthToken, startup } from '../../App/Sagas/StartupSagas'
import LoginActions from '../../App/Redux/LoginRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watches for the right action', (t) => {
  const step = stepper(startup())
  LoginActions.loginSuccess({ authToken: 'hi' })
  t.deepEqual(step(), select(selectAuthToken))
  t.deepEqual(step(), put(LoginActions.loginLoad()))
})
