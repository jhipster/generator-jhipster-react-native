import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StyleSheet } from 'react-native'

import AlertMessage from './alert-message'

const styles = StyleSheet.create({
  container: { backgroundColor: 'red' },
})

storiesOf('AlertMessage', module)
  .add('Default', () => <AlertMessage title="ALERT ALERT" />)
  .add('Hidden', () => <AlertMessage title="ALERT ALERT" show={false} />)
  .add('Custom Style', () => <AlertMessage title="ALERT ALERT" style={styles.container} />)
