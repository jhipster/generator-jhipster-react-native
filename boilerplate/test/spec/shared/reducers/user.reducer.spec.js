import Actions, { reducer, INITIAL_STATE } from '../../../../app/shared/reducers/user.reducer'

test('attempt retrieving a single user', () => {
  const state = reducer(INITIAL_STATE, Actions.userRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.user).toBe(null)
})

test('attempt retrieving a list of user', () => {
  const state = reducer(INITIAL_STATE, Actions.userAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.users).toBe(null)
})

test('attempt updating a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.user).toEqual({ id: 1 })
})

test('success retrieving a list of user', () => {
  const state = reducer(INITIAL_STATE, Actions.userAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.users).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.user).toEqual({ id: 1 })
})
test('success deleting a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.user).toEqual(null)
})

test('failure retrieving a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.user).toEqual(null)
})

test('failure retrieving a list of user', () => {
  const state = reducer(INITIAL_STATE, Actions.userAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.users).toEqual(null)
})

test('failure updating a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.user).toEqual(INITIAL_STATE.user)
})
test('failure deleting a user', () => {
  const state = reducer(INITIAL_STATE, Actions.userDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.user).toEqual(INITIAL_STATE.user)
})
