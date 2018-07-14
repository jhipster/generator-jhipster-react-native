import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changePasswordRequest: ['currentPassword', 'newPassword'],
  changePasswordSuccess: ['response'],
  changePasswordFailure: ['error']
})

export const ChangePasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  response: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to request a password reset email
export const request = (state) => state.merge({ fetching: true })

// we've successfully request to reset the password
export const success = (state) => state.merge({ fetching: false, error: null })

// we've had a problem requesting to reset the password
export const failure = (state, { error }) => state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_PASSWORD_REQUEST]: request,
  [Types.CHANGE_PASSWORD_SUCCESS]: success,
  [Types.CHANGE_PASSWORD_FAILURE]: failure
})

/* ------------- Selectors ------------- */
