import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import SearchBar from '../../../../../app/shared/components/search-bar/search-bar'

test('SearchBar component renders correctly', () => {
  const tree = renderer.create(<SearchBar onSearch={() => {}} onCancel={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('onSearch', () => {
  const onSearch = () => {}
  const onCancel = () => {}
  const searchTerm = ''
  const onSubmitEditing = onSearch.bind(searchTerm)
  const wrapperPress = shallow(<SearchBar onSearch={onSearch} onCancel={onCancel} searchTerm={searchTerm} />)

  // checks that the methods use the right handlers
  expect(wrapperPress.findWhere((node) => node.prop('testID') === 'searchTextInput').prop('onChangeText')).toBe(onSearch) // uses the right handler
  expect(JSON.stringify(wrapperPress.findWhere((node) => node.prop('testID') === 'searchTextInput').prop('onSubmitEditing'))).toEqual(JSON.stringify(onSubmitEditing))
})
