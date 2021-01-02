import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default React.forwardRef((props, ref) => {
  const { value, label, labelStyle, error, listItems = [], placeholder, listItemLabelField, testID, ...otherProps } = props;
  const actualPlaceholder = placeholder ? placeholder : 'Select an item...';

  const memoizedItems = React.useMemo(() => {
    // map the list items to the expected Picker format
    const mapListItems = () => {
      const children = listItems.map((listItem) => {
        const itemLabel = listItem[listItemLabelField] || listItem.id || '';
        return { name: `${itemLabel}`, id: listItem.id };
      });
      return [
        {
          name: label,
          id: 0,
          children,
        },
      ];
    };
    return mapListItems(listItems);
  }, [label, listItemLabelField, listItems]);

  if (!listItems.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* if there's a label, render it */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      {/* render the picker */}
      <SectionedMultiSelect
        IconRenderer={MaterialIcons}
        items={memoizedItems}
        alwaysShowSelectText={true}
        expandDropDowns={true}
        uniqueKey="id"
        subKey="children"
        selectText={actualPlaceholder}
        showDropDowns={true}
        readOnlyHeadings={true}
        selectedItems={value}
        subItemsFlatListProps={{ initialNumToRender: 15 }}
        ref={ref}
        styles={pickerStyles}
        // pickerProps={{ testID: `${testID}Picker` }}
        // touchableDoneProps={{ testID: `${testID}PickerDone` }}
        {...otherProps}
      />

      {/* if there's an error, render it */}
      {!!error && !!error.message && <Text style={styles.textError}>{error && error.message}</Text>}
    </View>
  );
});
const pickerStyles = StyleSheet.create({
  chipText: {
    color: 'black',
  },
  chipContainer: {
    borderRadius: 10,
  },
  selectToggle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 3,
    paddingVertical: 7,
    borderColor: '#c0cbd3',
    borderStyle: 'solid',
  },
  button: { backgroundColor: Colors.jhipsterBlue },
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});
