import React from 'react';
import { Button, Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import LoginActions from './login.reducer';
import { useDidUpdateEffect } from '../../shared/util/use-did-update-effect';
import styles from './login-screen.styles';

function LoginScreen(props) {
  const { navigation, account, fetching, error, attemptLogin, fetchingAccount, fetchingAuthInfo, authInfoError } = props;
  // setup error state for displaying error messages
  const [loginError, setLoginError] = React.useState('');

  // if the user is already logged in, send them home
  React.useEffect(() => {
    if (account !== null) {
      navigation.navigate('Home');
    }
  }, [account, navigation]);

  // skip the first render but check for API responses and show error if not fetching
  useDidUpdateEffect(() => {
    if (!fetching && error) {
      setLoginError(error);
    }
  }, [fetching]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      <Button title={'Login'} onPress={attemptLogin} disabled={fetchingAuthInfo || fetchingAccount} />
      {authInfoError ? <Text style={styles.errorText}>Error fetching auth info from backend.</Text> : null}
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
      {(fetchingAuthInfo || fetchingAccount) && (
        <View style={styles.loading}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetchingAuthInfo: state.authInfo.fetching,
    authInfoError: state.authInfo.error,
    fetchingAccount: state.account.fetching,
    fetching: state.login.fetching,
    error: state.login.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => dispatch(LoginActions.loginRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
