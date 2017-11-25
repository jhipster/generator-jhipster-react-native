import { call } from 'redux-saga/effects'
import WebsocketService from '../../App/Services/WebsocketService'

const stepper = (fn) => (mock) => fn.next(mock).value

test('websocket path', () => {
  const step = stepper(WebsocketService.websocketSagas())
  // Call the redux with a successful chat receipt
  const initialCall = call(WebsocketService.initWebsocket)
  expect(step()).toEqual(initialCall)
})
