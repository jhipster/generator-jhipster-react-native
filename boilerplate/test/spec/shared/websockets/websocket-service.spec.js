import { call } from 'redux-saga/effects'

import WebsocketService from '../../../../app/shared/websockets/websocket.service'

const stepper = (fn) => (mock) => fn.next(mock).value

test('websocket path', () => {
  const step = stepper(WebsocketService.websocketSagas())
  // Call the redux with a successful chat receipt
  const initialCall = call(WebsocketService.initWebsocket)
  expect(step()).toEqual(initialCall)
})
