import { getStorybookUI, configure } from '@storybook/react-native'
import { View } from 'react-native'
import './rn-addons'

// import stories
configure(() => {
  require('./stories')
}, module)

const StorybookUIRoot = __DEV__ ? getStorybookUI({}) : View

export default StorybookUIRoot
