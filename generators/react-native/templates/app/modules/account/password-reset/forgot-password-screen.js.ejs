import React, { createRef } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import ForgotPasswordActions from './forgot-password.reducer';
import styles from './forgot-password-screen.styles';

function ForgotPasswordScreen(props) {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
  });

  const onSubmit = (data) => {
    setSuccess('');
    setError('');
    props.resetPassword(data.email);
  };

  useDidUpdateEffect(() => {
    if (!props.fetching) {
      if (props.error) {
        setError(props.error);
      } else {
        setSuccess('Password reset email sent');
      }
    }
  }, [props.fetching]);

  // create refs for handling onSubmit functionality
  const formRef = createRef();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      <Form initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
        <FormField
          name="email"
          label="Email"
          placeholder="Enter email"
          onSubmitEditing={() => formRef?.current?.submitForm()}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="username"
        />
        <FormButton title={'Reset Password'} />
      </Form>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    fetching: state.forgotPassword.fetching,
    error: state.forgotPassword.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(ForgotPasswordActions.forgotPasswordRequest(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
