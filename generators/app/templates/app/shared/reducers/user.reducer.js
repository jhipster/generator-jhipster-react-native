import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['userId'],
  userAllRequest: ['options'],
  userUpdateRequest: ['user'],
  userDeleteRequest: ['userId'],

  userSuccess: ['user'],
  userAllSuccess: ['users'],
  userUpdateSuccess: ['user'],
  userDeleteSuccess: [],

  userFailure: ['error'],
  userAllFailure: ['error'],
  userUpdateFailure: ['error'],
  userDeleteFailure: ['error']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  user: null,
  users: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    user: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    users: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { user } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    user
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { users } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    users
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { user } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    user
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    user: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    user: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    users: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    user: state.user
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    user: state.user
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_ALL_REQUEST]: allRequest,
  [Types.USER_UPDATE_REQUEST]: updateRequest,
  [Types.USER_DELETE_REQUEST]: deleteRequest,

  [Types.USER_SUCCESS]: success,
  [Types.USER_ALL_SUCCESS]: allSuccess,
  [Types.USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_FAILURE]: failure,
  [Types.USER_ALL_FAILURE]: allFailure,
  [Types.USER_UPDATE_FAILURE]: updateFailure,
  [Types.USER_DELETE_FAILURE]: deleteFailure
})
