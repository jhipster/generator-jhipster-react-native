import { put, select } from 'redux-saga/effects'

import { processWebsocketMessage, selectState } from '../../../../app/shared/websockets/websocket.sagas'
import ChatActions from '../../../../app/modules/chat/chat.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('chat success path', () => {
  const chat = { username: 'user', message: 'test' }
  const step = stepper(processWebsocketMessage({ subscription: 'chat', msg: chat }))
  // Call the redux with a successful chat receipt
  expect(step()).toEqual(select(selectState, 'chat', 'chat'))
  expect(step(chat)).toEqual(put(ChatActions.chatSuccess([chat, chat])))
  expect(step()).toEqual(undefined)
})

test('unknown message path', () => {
  const message = { message: 'unknown' }
  const step = stepper(processWebsocketMessage({ subscription: 'notifications', msg: message }))
  // Call the redux with a successful chat receipt
  expect(step()).toEqual(undefined)
})

test('select state test', () => {
  const state = {
    chat: {
      chat: [
        { username: 'user', message: 'test' }
      ]
    }
  }
  const key = 'chat'
  const subKey = 'chat'
  const selection = selectState(state, key, subKey)
  // Call the redux with a successful chat receipt
  expect(selection).toEqual([{ username: 'user', message: 'test' }])
})
