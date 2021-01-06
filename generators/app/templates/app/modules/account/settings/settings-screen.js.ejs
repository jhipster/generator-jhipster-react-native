import React, { createRef } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import AccountActions from '../../../shared/reducers/account.reducer';
import styles from './settings-screen.styles';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';

function SettingsScreen(props) {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
  });

  const onSubmit = (data) => {
    setSuccess('');
    setError('');
    props.updateAccount(data);
  };

  useDidUpdateEffect(() => {
    if (!props.updating) {
      if (props.error) {
        setError(props.error);
      } else {
        props.getAccount();
        setSuccess('Settings updated');
      }
    }
  }, [props.updating]);

  // create refs for handling onSubmit functionality
  const formRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} testID="settingsScreen" keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      <Form initialValues={props.account} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
        <FormField
          name="firstName"
          ref={firstNameRef}
          testID="firstNameInput"
          label="First Name"
          placeholder="Enter first name"
          onSubmitEditing={() => lastNameRef?.current?.focus()}
          autoCapitalize="none"
        />
        <FormField
          name="lastName"
          ref={lastNameRef}
          testID="lastNameInput"
          label="Last Name"
          placeholder="Enter last name"
          onSubmitEditing={() => emailRef?.current?.focus()}
          autoCapitalize="none"
        />
        <FormField
          name="email"
          ref={emailRef}
          testID="emailInput"
          label="Email"
          placeholder="Enter email"
          onSubmitEditing={() => formRef?.current?.submitForm()}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="username"
        />
        <FormButton testID="settingsSubmitButton" title={'Save'} />
      </Form>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (account) => dispatch(AccountActions.accountUpdateRequest(account)),
    getAccount: () => dispatch(AccountActions.accountRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
