import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: [],
  accountSuccess: ['account'],
  accountFailure: ['error'],
  logout: null
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  account: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to account
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, data) => {
  const { account } = data
  return state.merge({ fetching: false, error: null, account })
}

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure
})

/* ------------- Selectors ------------- */
