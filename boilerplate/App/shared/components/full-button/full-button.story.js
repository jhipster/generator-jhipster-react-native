import React from 'react'
import { storiesOf } from '@storybook/react-native'

import FullButton from './full-button'

storiesOf('FullButton', module)
  .add('Default', () => (
    <FullButton
      text='A simple button'
    />
  ))
  .add('Custom Style', () => (
    <FullButton
      text='Style Me Up!'
      styles={{ backgroundColor: 'blue' }}
    />
  ))
