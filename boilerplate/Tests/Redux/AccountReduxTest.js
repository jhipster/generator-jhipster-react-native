import Actions, { reducer, INITIAL_STATE, isLoggedIn } from '../../App/Redux/AccountRedux'

test('request', () => {
  const state = reducer(INITIAL_STATE, Actions.accountRequest())

  expect(state.fetching).toBe(true)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.accountSuccess({username: 'user'}))

  expect(state.account).toEqual({username: 'user'})
})

test('update request', () => {
  const state = reducer(INITIAL_STATE, Actions.accountUpdateRequest({username: 'user2'}))

  expect(state.updating).toBe(true)
})

test('update success', () => {
  const state = reducer(INITIAL_STATE, Actions.accountUpdateSuccess())

  expect(state.updating).toEqual(false)
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.accountFailure({error: 'Not Authorized'}))

  expect(state.fetching).toBe(false)
  expect(state.error).toEqual({error: 'Not Authorized'})
})

test('isLoggedIn', () => {
  const state = reducer(INITIAL_STATE, Actions.accountSuccess({username: 'user'}))

  expect(isLoggedIn(state)).toBe(true)
})
