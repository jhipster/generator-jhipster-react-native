import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import SearchBar from '../../../app/shared/components/search-bar/search-bar'

storiesOf('SearchBar')
  .add('Default', () => (
    <View style={{ backgroundColor: 'black', height: 50 }}>
      <SearchBar
        onSearch={() => {}}
        onCancel={() => {}}
      />
    </View>
  ))
  .add('With Search Term', () => (
    <View style={{ backgroundColor: 'black', height: 50 }}>
      <SearchBar
        onSearch={() => {}}
        onCancel={() => {}}
        searchTerm='HELLO!!'
      />
    </View>
  ))
