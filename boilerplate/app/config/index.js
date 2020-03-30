import DebugConfig from './debug-config'

// load font libraries for react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont()

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !DebugConfig.yellowBox
}
