import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Fonts } from '../../../themes';

export default React.forwardRef((props, ref) => {
  const { label, labelStyle, error, value, listItems = [], placeholder, listItemLabelField, testID, ...otherProps } = props;
  const actualPlaceholder = {
    label: placeholder ? placeholder : 'Select an item...',
    value: '',
    color: 'black',
  };

  const memoizedItems = React.useMemo(() => {
    // map the list items to the expected Picker format
    const mapListItems = () => {
      return listItems.map((listItem) => {
        const itemLabel = listItem[listItemLabelField] || listItem.label || listItem.id || '';
        const itemValue = listItem.value || listItem.id || '';
        const itemKey = listItem.itemKey || listItem.id || '';
        return { label: `${itemLabel}`, value: itemValue, key: itemKey.toString() };
      });
    };

    return mapListItems(listItems);
  }, [listItemLabelField, listItems]);

  return (
    <View style={styles.container}>
      {/* if there's a label, render it */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      {/* render the picker */}
      <RNPickerSelect
        placeholder={actualPlaceholder}
        items={memoizedItems}
        style={pickerStyles}
        ref={ref}
        itemKey={value.toString()}
        value={value}
        touchableWrapperProps={{ testID }}
        pickerProps={{ testID: `${testID}Picker` }}
        touchableDoneProps={{ testID: `${testID}PickerDone` }}
        {...otherProps}
      />

      {/* if there's an error, render it */}
      {!!error && !!error.message && <Text style={styles.textError}>{error && error.message}</Text>}
    </View>
  );
});

const pickerStyles = StyleSheet.create({
  inputWeb: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 40,
    fontFamily: Fonts.type.base,
    borderColor: '#c0cbd3',
    color: 'black',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#c0cbd3',
    backgroundColor: 'white',
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#c0cbd3',
    backgroundColor: 'white',
    color: 'black',
  },
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
