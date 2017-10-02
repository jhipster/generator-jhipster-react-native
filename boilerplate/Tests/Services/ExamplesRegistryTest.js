import React from 'react'
import { View } from 'react-native'
import ExamplesRegistry from '../../App/Services/ExamplesRegistry'
import DebugConfig from '../../App/Config/DebugConfig'
import renderer from 'react-test-renderer'

test('does not render component example when includeExamples is false', () => {
  DebugConfig.includeExamples = false
  ExamplesRegistry.addComponentExample('Component Example 1', () => <View />)
  const tree = renderer.create(<View>{ExamplesRegistry.renderComponentExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('does not render plugin example when includeExamples is false', () => {
  DebugConfig.includeExamples = false
  ExamplesRegistry.addPluginExample('Plugin Example 1', () => <View />)
  const tree = renderer.create(<View>{ExamplesRegistry.renderPluginExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders components correctly when empty', () => {
  DebugConfig.includeExamples = true
  const tree = renderer.create(<View>{ExamplesRegistry.renderComponentExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders components correctly with an example', () => {
  DebugConfig.includeExamples = true
  ExamplesRegistry.addComponentExample('Component Example 2', () => <View />)
  const tree = renderer.create(<View>{ExamplesRegistry.renderComponentExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders plugins correctly with an example', () => {
  DebugConfig.includeExamples = true
  ExamplesRegistry.addPluginExample('Plugin Example 2', () => <View />)
  const tree = renderer.create(<View>{ExamplesRegistry.renderPluginExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders components correctly with just a title', () => {
  DebugConfig.includeExamples = true
  ExamplesRegistry.addComponentExample('Component Example 3')
  const tree = renderer.create(<View>{ExamplesRegistry.renderComponentExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders plugins correctly with just a title', () => {
  DebugConfig.includeExamples = true
  ExamplesRegistry.addPluginExample('Plugin Example 3')
  const tree = renderer.create(<View>{ExamplesRegistry.renderPluginExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders plugins correctly when empty', () => {
  DebugConfig.includeExamples = true
  const tree = renderer.create(<View>{ExamplesRegistry.renderPluginExamples()}</View>).toJSON()
  expect(tree).toMatchSnapshot()
})
