/**
 * @jest-environment jsdom
 */
import 'react-native';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import RoundedButton from '../../../../../app/shared/components/rounded-button/rounded-button';

test('RoundedButton component renders correctly', () => {
  const tree = renderer.create(<RoundedButton onPress={() => {}} text="howdy" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RoundedButton component with children renders correctly', () => {
  const tree = renderer.create(<RoundedButton onPress={() => {}}>Howdy</RoundedButton>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RoundedButton component with no content prop renders correctly', () => {
  const tree = renderer.create(<RoundedButton onPress={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('onPress', () => {
  let i = 0;
  const onPress = () => i++;
  render(<RoundedButton onPress={onPress} text="hi" />);

  expect(i).toBe(0);
  fireEvent.press(screen.getByText('HI'));
  expect(i).toBe(1);
});
