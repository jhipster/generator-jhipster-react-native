import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
/* eslint-disable react-native/no-inline-styles */

export default React.forwardRef((props, ref) => {
  const { label, labelStyle, error, inputType, ...otherProps } = props;
  const CustomInput = ({ value, onClick }) => (
    <TextInput ref={ref} style={[styles.input, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]} value={value} onClick={onClick} />
  );
  // show timepicker for datetime fields
  const dateTimeProps = inputType === 'datetime' ? { showTimeSelect: true, timeFormat: 'p', dateFormat: 'Pp' } : {};
  // these props prevent the popover from appearing below, when it appears below it appears behind other input fields
  const popperProps = {
    popperPlacement: 'top',
    popperModifiers: {
      flip: {
        behavior: ['top'], // don't allow it to flip to be above
      },
      preventOverflow: {
        enabled: false, // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
      },
      hide: {
        enabled: false, // turn off since needs preventOverflow to be enabled
      },
    },
  };

  return (
    <View style={styles.container}>
      {/* if there's a label, render it */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <DatePicker
        customInputRef={ref}
        customInput={<CustomInput />}
        popperPlacement="top"
        {...popperProps}
        {...dateTimeProps}
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
    backgroundColor: 'white',
    borderStyle: 'solid',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
  },
});
