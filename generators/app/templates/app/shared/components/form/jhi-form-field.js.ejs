import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from './inputs/jhi-text-input';
import AppSwitchInput from './inputs/jhi-switch-input';
import AppListInput from './inputs/jhi-list-input';
import AppMultiListInput from './inputs/jhi-multi-list-input';
import AppDateInput from './inputs/jhi-date-input';
import { StyleSheet, Text } from 'react-native';
import ApplicationStyles from '../../themes/application.styles';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
});

export default React.forwardRef((props, ref) => {
  let { name, inputType, ...otherProps } = props;
  const { setFieldTouched, setFieldValue, values, errors, touched } = useFormikContext();

  if (!inputType) {
    inputType = 'text';
  }
  if (!['text', 'boolean', 'number', 'date', 'datetime', 'select-one', 'select-multiple'].includes(inputType)) {
    return <Text style={styles.errorText}>INVALID INPUT TYPE '{inputType}'</Text>;
  }

  // ensure fields are the correct format
  if (inputType === 'date' || (inputType === 'datetime' && !(values[name] instanceof Date))) {
    // date values can't be strings
    values[name] = new Date(values[name]);
  }
  if (inputType === 'boolean') {
    values[name] = Boolean(values[name]);
  }
  if (inputType === 'number' && (typeof values[name]).toLowerCase() === 'number') {
    // number values have to be strings
    values[name] = String(values[name]);
  }

  const hasError = errors[name] && touched[name];
  return (
    <React.Fragment>
      {(!inputType || inputType === 'text') && (
        <AppTextInput
          ref={ref}
          value={values[name]}
          onChangeText={(text) => setFieldValue(name, text)}
          onBlur={() => setFieldTouched(name)}
          error={hasError}
          {...otherProps}
        />
      )}
      {inputType === 'number' && (
        <AppTextInput
          ref={ref}
          keyboardType="numeric"
          value={values[name]}
          onChangeText={(text) => {
            const numberRegex = new RegExp(/^-?(\d*)?\.?(\d+)?$/);
            if (text.length === 0 || numberRegex.test(text.toString())) {
              setFieldValue(name, text);
            }
          }}
          onBlur={() => setFieldTouched(name)}
          error={hasError}
          {...otherProps}
        />
      )}
      {inputType === 'boolean' && (
        <AppSwitchInput
          ref={ref}
          value={values[name]}
          onValueChange={(value) => setFieldValue(name, value)}
          onBlur={() => setFieldTouched(name)}
          error={hasError}
          {...otherProps}
        />
      )}
      {inputType === 'select-one' && (
        <AppListInput
          ref={ref}
          value={values[name]}
          onValueChange={(value) => setFieldValue(name, value)}
          onBlur={() => setFieldTouched(name)}
          error={hasError}
          {...otherProps}
        />
      )}
      {inputType === 'select-multiple' && (
        <AppMultiListInput
          ref={ref}
          value={values[name]}
          onSelectedItemsChange={(value) => setFieldValue(name, value)}
          onBlur={() => setFieldTouched(name)}
          error={hasError}
          {...otherProps}
        />
      )}
      {(inputType === 'date' || inputType === 'datetime') && (
        <AppDateInput
          ref={ref}
          inputType={inputType}
          value={values[name]}
          selected={values[name]}
          onChange={(value) => setFieldValue(name, value)}
          onBlur={() => setFieldTouched(name)}
          error={hasError}
          {...otherProps}
        />
      )}
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </React.Fragment>
  );
});
