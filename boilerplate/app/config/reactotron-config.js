import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

import Config from './debug-config'

if (Config.useReactotron) {
  Reactotron
    .configure({
      // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: 'Ignite JHipster App' // would you like to see your app's name?,
    })
    .useReactNative({ asyncStorage: false })
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
} else {
  const noop = () => undefined
  // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
  console.tron = {
    configure: noop,
    connect: noop,
    use: noop,
    useReactNative: noop,
    clear: noop,
    log: noop,
    logImportant: noop,
    display: noop,
    error: noop,
    warn: noop,
    image: noop,
    reportError: noop
  }
}
