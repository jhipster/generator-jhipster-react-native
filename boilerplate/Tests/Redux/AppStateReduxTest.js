import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/AppStateRedux'

test('rehydration complete', () => {
  const state = reducer(INITIAL_STATE, Actions.setRehydrationComplete())

  expect(state.rehydrationComplete).toBe(true)
})
