import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StyleSheet } from 'react-native'

import FullButton from './full-button'

const styles = StyleSheet.create({
  container: { backgroundColor: 'blue' },
})
storiesOf('FullButton', module)
  .add('Default', () => <FullButton text="A simple button" />)
  .add('Custom Style', () => <FullButton text="Style Me Up!" styles={styles.container} />)
