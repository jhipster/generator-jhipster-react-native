import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default React.forwardRef((props, ref) => {
  const { label, labelStyle, error, onChange, inputType, testID, ...otherProps } = props;

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const toggleDatePickerButton = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onConfirm = (date) => {
    onChange(date);
    toggleDatePickerButton();
  };

  let d = otherProps.value;
  let displayValue = '';
  if (d instanceof Date && !isNaN(d.valueOf())) {
    const opts =
      inputType === 'date'
        ? { year: 'numeric', month: 'numeric', day: 'numeric' }
        : { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    displayValue = `${d.toLocaleString([], opts)}`;
  }

  return (
    <View style={styles.container}>
      {/* if there's a label, render it */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      {/* render the date picker */}
      <TouchableOpacity onPress={toggleDatePickerButton}>
        <View pointerEvents="none">
          <TextInput editable={false} style={styles.input} value={displayValue} testID={testID} />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode={inputType}
        date={otherProps.value}
        isDarkModeEnabled={false}
        onConfirm={onConfirm}
        onCancel={toggleDatePickerButton}
        testID={`${testID}Modal`}
        {...otherProps}
      />

      {/* if there's an error, render it */}
      {!!error && !!error.message && <Text style={styles.textError}>{error && error.message}</Text>}
    </View>
  );
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
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c0cbd3',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
  },
});
