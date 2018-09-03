import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import DrawerButton from '../../../app/navigation/drawer/drawer-button'

storiesOf('DrawerButton', module)
  .add('Default', () => (
    <View style={{ backgroundColor: 'black' }}>
      <DrawerButton
        text='Drawer Button'
        onPress={() => { }}
      />
    </View>
  ))
