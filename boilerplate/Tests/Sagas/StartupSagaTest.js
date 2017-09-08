import { select, put } from 'redux-saga/effects'
import { selectAuthToken, startup } from '../../App/Sagas/StartupSagas'
import LoginActions from '../../App/Redux/LoginRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watches for the right action', () => {
  const step = stepper(startup())
  LoginActions.loginSuccess({ authToken: 'hi' })
  expect(step()).toEqual(select(selectAuthToken))
  expect(step()).toEqual(put(LoginActions.loginLoad()))
})
