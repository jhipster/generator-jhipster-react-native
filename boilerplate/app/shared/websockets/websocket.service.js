import { call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import SockJS from 'sockjs-client'

import AppConfig from '../../config/app-config'
import { processWebsocketMessage } from './websocket.sagas'

const webstomp = require('stompjs')

let em
let accessToken
let connection = createConnection()
let alreadyConnectedOnce = false
let connected = false
let initialConnect = true
let connectedPromise = null
let socket = null
let stompClient = null
let wsSessionId = null
let token = null
let attempts = 0

let chatSubscriber

const subscriptions = {}
function onConnect () {
  setWsSessionId(socket)
  connectedPromise('success')
  connectedPromise = null
  connected = true

  if (!initialConnect) {
    console.tron.log('Resubscribing...')
    Object.keys(subscriptions).forEach(function (key) {
      if (key === 'chat') {
        subscribeToChat()
      }
    })
  }
  initialConnect = false
}

function onError (error) {
  console.tron.error(`Error connecting to websockets ${error}`)
  const time = generateInterval(attempts)
  alreadyConnectedOnce = false
  connected = false
  connectedPromise = null
  setTimeout(function () {
    attempts++
    connect()
  }, time)
  console.tron.error(`STOMP: Reconnecting in ${Math.round(time / 1000)} seconds`)
}

function createConnection () {
  return new Promise((resolve, reject) => {
    connectedPromise = resolve
  })
}
// methods for connecting/disconnecting
function connect () {
  // connection
  if (!alreadyConnectedOnce) {
    if (connectedPromise === null) connection = createConnection()
    var url = AppConfig.apiUrl + 'websocket/chat'
    if (accessToken) {
      token = accessToken
      url += '?access_token=' + accessToken
    }
    socket = new SockJS(url)
    stompClient = webstomp.over(socket)
    // stompClient.debug = null
    console.tron.log(`Connecting to ${url}`)
    var headers = {}
    stompClient.connect(headers, onConnect, onError)
    alreadyConnectedOnce = true
  }
}

function disconnect () {
  console.tron.log('Disconnecting')
  if (stompClient !== null && connected) {
    connectedPromise = null
    stompClient.disconnect()
    stompClient = null
  }
  connected = false
  alreadyConnectedOnce = false
}

// methods for subscribing
function subscribeToChat () {
  console.tron.log('Subscribing to Chat')
  if (!Object.prototype.hasOwnProperty.call(subscriptions, 'chat')) {
    subscriptions.chat = { subscribed: true }
    connection.then(() => {
      chatSubscriber = stompClient.subscribe('/topic/chat', onMessage.bind(this, 'chat'))
    })
  }
}

// methods for unsubscribing
function unsubscribeChat () {
  delete subscriptions.chat
  if (chatSubscriber) {
    chatSubscriber.unsubscribe()
  }
}

// methods for sending
function sendChat (ev) {
  if (stompClient !== null && stompClient.connected) {
    var p = '/topic/chat'
    stompClient.send(p, {}, JSON.stringify(ev))
  }
}

// when the message is received, send it to the WebsocketSaga
function onMessage (subscription, fullMessage) {
  let msg = null
  try {
    msg = JSON.parse(fullMessage.body)
  } catch (fullMessage) {
    console.tron.error(`Error parsing : ${fullMessage}`)
  }
  if (msg) {
    return em({ subscription, msg })
  }
}

// getters and setters
function getToken () {
  return token
}

function setToken (token) {
  accessToken = token
  if (connected) {
    disconnect()
    connect()
  }
}

function getSubscriptions () {
  return subscriptions
}

function getWsSessionId () {
  return wsSessionId
}

function setWsSessionId (socket) {
  const splitUrl = socket._transport.url.split('/')
  wsSessionId = splitUrl[5]
  console.tron.log(`Set WS Session ID to ${wsSessionId}`)
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
  getSubscriptions,
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
      console.tron.log('Socket off')
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
