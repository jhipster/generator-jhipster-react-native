import { getStorybookUI, configure } from '@storybook/react-native'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import './rn-addons'

// import stories
configure(() => {
  require('./stories')
}, module)

const StorybookUIRoot = __DEV__ ? getStorybookUI({asyncStorage: AsyncStorage}) : View

export default StorybookUIRoot
