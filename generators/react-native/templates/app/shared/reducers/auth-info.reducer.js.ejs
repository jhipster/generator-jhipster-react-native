import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authInfoRequest: [],
  authInfoSuccess: ['authInfo'],
  authInfoFailure: ['error'],
});

export const AuthInfoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authInfo: null,
  fetching: false,
  error: null,
});

/* ------------- Reducers ------------- */

export const request = (state) => state.merge({ fetching: true, error: null, authInfo: null });

export const success = (state, { authInfo }) => state.merge({ fetching: false, error: null, authInfo });

export const failure = (state, { error }) => state.merge({ fetching: false, error, authInfo: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_INFO_REQUEST]: request,
  [Types.AUTH_INFO_SUCCESS]: success,
  [Types.AUTH_INFO_FAILURE]: failure,
});
