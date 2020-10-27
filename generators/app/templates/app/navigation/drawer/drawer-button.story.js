import React from 'react'
import { StyleSheet, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import DrawerButton from '../../../app/navigation/drawer/drawer-button'

const styles = StyleSheet.create({
  container: { backgroundColor: 'black' },
})

storiesOf('DrawerButton', module).add('Default', () => (
  <View style={styles.container}>
    <DrawerButton text="Drawer Button" onPress={() => {}} />
  </View>
))
