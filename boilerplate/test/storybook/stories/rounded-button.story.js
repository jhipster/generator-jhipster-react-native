import React from 'react'
import { storiesOf } from '@storybook/react-native'

import RoundedButton from '../../../app/shared/components/rounded-button/rounded-button'

storiesOf('RoundedButton')
  .add('Default', () => (
    <RoundedButton
      text='A simple rounded button'
    />
  ))
  .add('Text as children', () => (
    <RoundedButton>
        Hello from the children!
    </RoundedButton>
  ))
