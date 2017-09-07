import { put, select } from 'redux-saga/effects'
import AppStateActions from '../Redux/AppStateRedux'
import LoginActions from '../Redux/LoginRedux'

export const selectAuthToken = (state) => state.login.authToken

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAuthToken
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAuthToken
      }
    })
  }
  const authToken = yield select(selectAuthToken)
  if (authToken !== null) {
    yield put(LoginActions.loginLoad())
  }
  yield put(AppStateActions.setRehydrationComplete())
}
