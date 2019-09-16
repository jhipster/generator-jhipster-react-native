import React from 'react'
import { StyleSheet, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import SearchBar from './search-bar'

const styles = StyleSheet.create({
  container: { backgroundColor: 'black', height: 50 },
})

storiesOf('SearchBar', module)
  .add('Default', () => (
    <View style={styles.container}>
      <SearchBar onSearch={() => {}} onCancel={() => {}} />
    </View>
  ))
  .add('With Search Term', () => (
    <View style={styles.container}>
      <SearchBar onSearch={() => {}} onCancel={() => {}} searchTerm="HELLO!!" />
    </View>
  ))
