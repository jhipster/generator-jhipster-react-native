/**
 * @jest-environment jsdom
 */
import 'react-native';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import SearchBar from '../../../../../app/shared/components/search-bar/search-bar';

test('SearchBar component renders correctly', async () => {
  const tree = renderer.create(<SearchBar onSearch={() => {}} onCancel={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('onSearch', async () => {
  const onSearch = () => {};
  const onCancel = () => {};
  const searchTerm = '';
  const onSubmitEditing = onSearch.bind(searchTerm);
  render(<SearchBar onSearch={onSearch} onCancel={onCancel} searchTerm={searchTerm} />);

  expect(JSON.stringify(screen.getByPlaceholderText('Search').props['onSubmitEditing'])).toEqual(JSON.stringify(onSubmitEditing));
});
