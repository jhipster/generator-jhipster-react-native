import 'react-native'
import React from 'react'
import SearchBar from '../../App/Components/SearchBar'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

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
  expect(wrapperPress.find('TextInput').prop('onChangeText')).toBe(onSearch) // uses the right handler
  expect(JSON.stringify(wrapperPress.find('TextInput').prop('onSubmitEditing'))).toEqual(JSON.stringify(onSubmitEditing))
})
