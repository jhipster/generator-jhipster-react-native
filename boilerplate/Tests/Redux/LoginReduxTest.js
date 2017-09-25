import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/LoginRedux'

test('attempt', () => {
  const state = reducer(INITIAL_STATE, Actions.loginRequest('u', 'p'))

  expect(state.fetching).toBe(true)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))

  expect(state.authToken).toBe('hi')
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(69))

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(69)
})

test('logout', () => {
  const loginState = reducer(INITIAL_STATE, Actions.loginSuccess({id_token: 'hi'}))
  const state = reducer(loginState, Actions.logoutRequest())

  expect(state.username).toBe(undefined)
})
