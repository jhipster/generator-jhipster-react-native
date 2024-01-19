import React, { createRef } from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import LoginActions from './login.reducer';
import { useDidUpdateEffect } from '../../shared/util/use-did-update-effect';
import FormButton from '../../shared/components/form/jhi-form-button';
import FormField from '../../shared/components/form/jhi-form-field';
import Form from '../../shared/components/form/jhi-form';
import styles from './login-screen.styles';

function LoginScreen(props) {
  const { account, navigation, fetching, loginError, attemptLogin } = props;
  // setup error state for displaying error messages
  const [error, setError] = React.useState('');

  // if the user is already logged in, send them home
  React.useEffect(() => {
    if (account !== null) {
      navigation.navigate('Home');
    }
  }, [account, navigation]);

  // skip the first render but check for API responses and show error if not fetching
  useDidUpdateEffect(() => {
    if (!fetching && loginError) {
      setError(loginError);
    }
  }, [fetching]);

  // submit handler
  const onSubmit = (data) => {
    setError('');
    attemptLogin(data.login, data.password);
  };

  // create refs for handling onSubmit functionality
  const passwordRef = createRef();
  const formRef = createRef();

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Please enter your login').label('Login'),
    password: Yup.string().required().label('Password'),
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} testID="loginScreen" keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      <Form initialValues={{ login: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
        <FormField
          name="login"
          testID="loginScreenUsername"
          label="Login"
          placeholder="Enter login"
          onSubmitEditing={() => passwordRef?.current?.focus()}
          autoCapitalize="none"
          textContentType="username"
        />
        <FormField
          ref={passwordRef}
          name="password"
          testID="loginScreenPassword"
          label="Password"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onSubmitEditing={() => formRef?.current?.submitForm()}
          textContentType="password"
        />
        <FormButton testID="loginScreenLoginButton" title={'Login'} />
      </Form>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.login.fetching,
    loginError: state.login.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
