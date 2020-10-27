import Actions, { reducer, INITIAL_STATE, isLoggedIn, getLogin } from '../../../../app/shared/reducers/account.reducer'

test('request', () => {
  const state = reducer(INITIAL_STATE, Actions.accountRequest())

  expect(state.fetching).toBe(true)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.accountSuccess({ login: 'user' }))

  expect(state.account).toEqual({ login: 'user' })
})

test('update request', () => {
  const state = reducer(INITIAL_STATE, Actions.accountUpdateRequest({ login: 'user2' }))

  expect(state.updating).toBe(true)
})

test('update success', () => {
  const state = reducer(INITIAL_STATE, Actions.accountUpdateSuccess())

  expect(state.updating).toEqual(false)
})

test('update failure', () => {
  const state = reducer(INITIAL_STATE, Actions.accountUpdateFailure({ error: 'Not Authorized' }))

  expect(state.updating).toEqual(false)
  expect(state.error).toEqual({ error: 'Not Authorized' })
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.accountFailure({ error: 'Not Authorized' }))

  expect(state.fetching).toBe(false)
  expect(state.error).toEqual({ error: 'Not Authorized' })
})

test('isLoggedIn', () => {
  const state = reducer(INITIAL_STATE, Actions.accountSuccess({ login: 'user' }))

  expect(isLoggedIn(state)).toBe(true)
})

test('getLogin', () => {
  const state = reducer(INITIAL_STATE, Actions.accountSuccess({ login: 'user' }))

  expect(getLogin(state)).toBe('user')
})

test('getLogin anonymous', () => {
  const state = reducer(INITIAL_STATE)

  expect(getLogin(state)).toBe('anonymousUser')
})
