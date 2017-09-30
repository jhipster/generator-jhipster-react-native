import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/PasswordRedux'

test('forgot password request', () => {
  const state = reducer(INITIAL_STATE, Actions.forgotPasswordRequest())

  expect(state.fetching).toBe(true)
})

test('forgot password success', () => {
  const state = reducer(INITIAL_STATE, Actions.forgotPasswordSuccess())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(null)
})

test('forgot password failure', () => {
  const state = reducer(INITIAL_STATE, Actions.forgotPasswordFailure({error: 'Email not found'}))

  expect(state.fetching).toBe(false)
  expect(state.error).toEqual({error: 'Email not found'})
})

test('change password request', () => {
  const state = reducer(INITIAL_STATE, Actions.changePasswordRequest())

  expect(state.fetching).toBe(true)
})

test('change password success', () => {
  const state = reducer(INITIAL_STATE, Actions.changePasswordSuccess())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(null)
})

test('change password failure', () => {
  const state = reducer(INITIAL_STATE, Actions.changePasswordFailure({error: 'Passwords do not match'}))

  expect(state.fetching).toBe(false)
  expect(state.error).toEqual({error: 'Passwords do not match'})
})
