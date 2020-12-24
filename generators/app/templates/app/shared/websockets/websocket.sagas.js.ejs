import { put, select } from 'redux-saga/effects'

import ChatActions from '../../modules/chat/chat.reducer'

export const selectState = (state, key, subKey) => state[key][subKey]

// processes the websocket message
export function * processWebsocketMessage ({ subscription, msg }) {
  console.tron.log(`WS-Saga: ${subscription}`)
  switch (subscription) {
    case 'chat':
      const state = yield select(selectState, 'chat', 'chat')
      const chat = [].concat(state)
      chat.push(msg)
      yield put(ChatActions.chatSuccess(chat))
      break
    default:
      console.tron.log(`Uncaught subscription: ${subscription}`)
      console.tron.log(`Uncaught message: ${msg}`)
  }
}
