import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: [],
  accountUpdateRequest: ['account'],
  accountSuccess: ['account'],
  accountUpdateSuccess: [],
  accountFailure: ['error']
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  account: null,
  error: null,
  fetching: false,
  updating: false
})

/* ------------- Reducers ------------- */

// we're attempting to account
export const request = (state) => state.merge({ fetching: true })

// we're attempting to updating account settings
export const updateRequest = (state) => state.merge({ updating: true })

// we've successfully logged in
export const success = (state, data) => {
  const { account } = data
  return state.merge({ fetching: false, error: null, account })
}
// we've successfully updated the account
export const updateSuccess = (state) => state.merge({ error: null, updating: false })

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, updating: false, account: null, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.ACCOUNT_FAILURE]: failure
})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = accountState => accountState.account !== null

export const getLogin = accountState => accountState.account !== null ? accountState.account.login : 'anonymousUser'
