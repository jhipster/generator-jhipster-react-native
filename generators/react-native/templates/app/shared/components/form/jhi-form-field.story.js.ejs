import React, { createRef } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet, Text } from 'react-native';
import FormButton from './jhi-form-button';
import FormField from './jhi-form-field';
import Form from './jhi-form';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ApplicationStyles } from '../../../shared/themes';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  flex: { flex: 1 },
  flexHalfBold: { flex: 0.5 },
  flexRow: { flexDirection: 'row' },
});

function DemoForm() {
  const [data, setData] = React.useState();

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    // email: Yup.string().required().email().label('Email'),
  });

  const onSubmit = (values) => {
    console.log(values);
    setData(values);
  };
  const sports = [
    {
      label: 'Football',
      value: 'football',
    },
    {
      label: 'Baseball',
      value: 'baseball',
    },
    {
      label: 'Hockey',
      value: 'hockey',
    },
  ];

  // create refs for handling onSubmit functionality
  const formRef = createRef();
  const stringFieldRef = createRef();
  const numFieldRef = createRef();
  const booleanFieldRef = createRef();
  const listFieldRef = createRef();
  const dateFieldRef = createRef();
  const dateTimeFieldRef = createRef();

  const initialValues = {
    stringField: '',
    numField: 0,
    booleanField: '',
    listField: '',
    dateField: new Date(),
    dateTimeField: new Date(),
  };

  return (
    <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      <Form initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
        <FormField
          inputType="text"
          name="stringField"
          ref={stringFieldRef}
          label="String Field"
          placeholder="Enter string field"
          autoCapitalize="none"
        />
        <FormField
          inputType="number"
          name="numField"
          ref={numFieldRef}
          label="Num Field"
          placeholder="Enter num field"
          autoCapitalize="none"
        />
        <FormField inputType="boolean" name="booleanField" ref={booleanFieldRef} label="Boolean Field" placeholder="Enter boolean field" />
        <FormField inputType="select-one" name="listField" ref={listFieldRef} label="List Field" listItems={sports} />
        <FormField inputType="date" name="dateField" ref={dateFieldRef} label="Date Field" />
        <FormField inputType="datetime" name="dateTimeField" ref={dateTimeFieldRef} label="Date Time Field" />
        <FormButton title={'Save'} />
        {data && (
          <View>
            {Object.keys(data).map((key, i) => {
              return (
                <View key={i} style={styles.flexRow}>
                  <Text style={styles.flexHalfBold}>{String(key)}: </Text>
                  <Text style={styles.flex}>{String(data[key])}</Text>
                </View>
              );
            })}
          </View>
        )}
      </Form>
    </KeyboardAwareScrollView>
  );
}

storiesOf('FormField', module).add('All Options', () => <DemoForm />);
