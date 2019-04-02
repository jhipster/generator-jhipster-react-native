import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/account/register/register.reducer'

test('request', () => {
  const state = reducer(INITIAL_STATE, Actions.registerRequest())

  expect(state.fetching).toBe(true)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.registerSuccess())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(null)
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.registerFailure({ error: 'Duplicate Email' }))

  expect(state.fetching).toBe(false)
  expect(state.error).toEqual({ error: 'Duplicate Email' })
})
