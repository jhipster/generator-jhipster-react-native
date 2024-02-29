import React, { createRef } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import RegisterActions from '../register/register.reducer';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './register-screen.styles';

function RegisterScreen(props) {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Please enter your login').label('Login'),
    password: Yup.string().required().label('Password'),
    confirmPassword: Yup.string().required().label('Confirm Password'),
    email: Yup.string().required().email().label('Email'),
  });

  const onSubmit = (data) => {
    setSuccess('');
    setError('');
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    props.register(data);
  };

  useDidUpdateEffect(() => {
    if (!props.fetching) {
      if (props.error) {
        setError(props.error);
      } else {
        setSuccess('Please check your email');
      }
    }
  }, [props.fetching]);

  // create refs for handling onSubmit functionality
  const formRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      <Form
        initialValues={{ login: '', email: '', confirmPassword: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        ref={formRef}>
        <FormField
          name="login"
          label="Login"
          placeholder="Enter login"
          onSubmitEditing={() => emailRef?.current?.focus()}
          autoCapitalize="none"
          textContentType="username"
        />
        <FormField
          name="email"
          ref={emailRef}
          label="Email"
          placeholder="Enter email"
          onSubmitEditing={() => passwordRef?.current?.focus()}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="username"
        />
        <FormField
          ref={passwordRef}
          name="password"
          label="Password"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
          textContentType="password"
        />
        <FormField
          ref={confirmPasswordRef}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onSubmitEditing={() => formRef?.current?.submitForm()}
          textContentType="password"
        />
        <FormButton title={'Register'} />
      </Form>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    fetching: state.register.fetching,
    error: state.register.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (account) => dispatch(RegisterActions.registerRequest(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
