import Actions, { reducer, INITIAL_STATE } from '../../../../app/modules/login/login.reducer'

test('request', () => {
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
test('load login request', () => {
  const state = reducer(INITIAL_STATE, Actions.loginLoad())
  expect(state.loading).toBe(true)
})

test('load login success', () => {
  const state = reducer(INITIAL_STATE, Actions.loginLoadSuccess())
  expect(state.loading).toBe(false)
})
test('logout', () => {
  const loginState = reducer(INITIAL_STATE, Actions.loginSuccess({ id_token: 'hi' }))
  const state = reducer(loginState, Actions.logoutRequest())

  expect(state.username).toBe(undefined)
})

test('logout success', () => {
  const loginState = reducer(INITIAL_STATE, Actions.loginSuccess({ id_token: 'hi' }))
  const state = reducer(loginState, Actions.logoutSuccess())

  expect(state).toBe(INITIAL_STATE)
})
