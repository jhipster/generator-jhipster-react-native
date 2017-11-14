import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  chatReset: [],
  chatWebsocketSuccess: ['message']
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  chat: []
})

/* ------------- Reducers ------------- */

// request to add a single chat to list
export const websocketSuccess = (state, { message }) => {
  const chat = [].concat(state.chat)
  chat.push(message)
  return state.merge({ chat })
}

export const reset = state => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHAT_WEBSOCKET_SUCCESS]: websocketSuccess,
  [Types.CHAT_RESET]: reset
})
