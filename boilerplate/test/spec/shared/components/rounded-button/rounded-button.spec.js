import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import RoundedButton from '../../../../../app/shared/components/rounded-button/rounded-button'

test('RoundedButton component renders correctly', () => {
  const tree = renderer.create(<RoundedButton onPress={() => {}} text='howdy' />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('RoundedButton component with children renders correctly', () => {
  const tree = renderer.create(<RoundedButton onPress={() => {}}>Howdy</RoundedButton>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('RoundedButton component with no content prop renders correctly', () => {
  const tree = renderer.create(<RoundedButton onPress={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('onPress', () => {
  let i = 0
  const onPress = () => i++
  const wrapperPress = shallow(<RoundedButton onPress={onPress} text='hi' />)

  expect(wrapperPress.prop('onPress')).toBe(onPress) // the component's onPress uses the right handler
  expect(i).toBe(0)
  wrapperPress.simulate('press')
  expect(i).toBe(1)
})
