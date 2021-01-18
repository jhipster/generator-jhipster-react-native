import { call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import SockJS from 'sockjs-client'
import * as Stomp from 'webstomp-client';

import AppConfig from '../../config/app-config'
import { processWebsocketMessage } from './websocket.sagas'

let em
let connectedPromise = null;
let connection = null;
let alreadyConnectedOnce = false
let connected = false
let socket = null
let stompClient = null
let wsSessionId = null
let token = null
let attempts = 0

let chatSubscriber

function onConnect () {
  setWsSessionId(socket)
  connectedPromise.resolve('success');
  connectedPromise = null
  connected = true
}

function onError (error) {
  console.warn(error);
  const time = generateInterval(attempts)
  alreadyConnectedOnce = false
  connected = false
  connectedPromise.reject('Error');
  connectedPromise = null
  setTimeout(function () {
    attempts++
    connect()
  }, time)
  console.warn(`STOMP: Reconnecting in ${Math.round(time / 1000)} seconds`)
}

function createConnection () {
  return new Promise((resolve, reject) => {
    connectedPromise = { resolve, reject };
  })
}
// methods for connecting/disconnecting
function connect () {
  if (!alreadyConnectedOnce) {
    if (connectedPromise === null) connection = createConnection()
    var url = AppConfig.apiUrl + 'websocket/tracker'
    if (token) {
      url += '?access_token=' + token
    }
    socket = new SockJS(url)
    stompClient = Stomp.over(socket, { protocols: ['v12.stomp'] });
    // stompClient.debug = null
    console.log(`Connecting to ${url}`)
    var headers = {}
    stompClient.connect(headers, onConnect, onError)
    alreadyConnectedOnce = true
  }
}

function disconnect () {
  console.log('Disconnecting')
  if (stompClient !== null && connected) {
    stompClient.disconnect()
    stompClient = null
  }
  connected = false
  alreadyConnectedOnce = false
}

// methods for subscribing
function subscribeToChat () {
  console.log('Subscribing to Chat')
  connection?.then(() => {
    chatSubscriber = stompClient.subscribe('/topic/chat', onMessage.bind(this, 'chat'))
  })
}

// methods for unsubscribing
function unsubscribeChat () {
  if (chatSubscriber) {
    chatSubscriber.unsubscribe()
  }
}

// method for sending
function sendChat (message) {
  if (stompClient !== null && stompClient.connected) {
    stompClient.send('/topic/chat', JSON.stringify(message), {});
  }
}

// when the message is received, send it to the WebsocketSaga
function onMessage (subscription, fullMessage) {
  let msg = null
  try {
    msg = JSON.parse(fullMessage.body)
  } catch (e) {
    console.warn(`Error parsing : ${fullMessage}`)
    console.warn(e)
  }
  if (msg) {
    return em({ subscription, msg })
  }
}

// getters and setters
function getToken () {
  return token
}

function setToken (jwtToken) {
  token = jwtToken
  if (connected) {
    disconnect()
    connect()
  }
}

function getWsSessionId () {
  return wsSessionId
}

function setWsSessionId (socketObject) {
  const splitUrl = socketObject._transport.url.split('/')
  wsSessionId = splitUrl[5]
  console.log(`Set WS Session ID to ${wsSessionId}`)
}

function getConnectedPromise () {
  return connection
}

// exponential backoff for reconnections
function generateInterval (k) {
  let maxInterval = (Math.pow(2, k) - 1) * 1000

  if (maxInterval > 30 * 1000) {
    // If the generated interval is more than 30 seconds, truncate it down to 30 seconds.
    maxInterval = 30 * 1000
  }
  // generate the interval to a random number between 0 and the maxInterval determined from above
  return Math.random() * maxInterval
}

export default {
  onConnect,
  onError,
  subscribeToChat,
  unsubscribeChat,
  connect,
  disconnect,
  createConnection,
  sendChat,
  getToken,
  setToken,
  getWsSessionId,
  getConnectedPromise,
  initWebsocket,
  websocketSagas
}

// connects to the websocket and sends events
function initWebsocket () {
  return eventChannel(emitter => {
    em = emitter
    // unsubscribe function
    return () => {
      console.log('Socket off')
    }
  })
}

function * websocketSagas () {
  const channel = yield call(initWebsocket)
  while (true) {
    const action = yield take(channel)
    yield call(processWebsocketMessage, action)
  }
}
