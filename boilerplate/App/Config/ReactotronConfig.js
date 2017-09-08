// import { StartupTypes } from '../Redux/StartupRedux'
import Config from '../Config/DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

if (Config.useReactotron) {
  Reactotron
    .configure({
      // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: 'Ignite App' // would you like to see your app's name?,
    })
    .useReactNative()
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
}
