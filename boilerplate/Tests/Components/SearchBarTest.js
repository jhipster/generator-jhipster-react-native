import 'react-native'
import React from 'react'
import SearchBar from '../../App/Components/SearchBar'
import renderer from 'react-test-renderer'

test('SearchBar component renders correctly', () => {
  const tree = renderer.create(<SearchBar onSearch={() => {}} onCancel={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})
