import React, { createRef } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ChangePasswordActions from '../password/change-password.reducer';
import styles from './change-password-screen.styles';
import * as Yup from 'yup';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';

function ChangePasswordScreen(props) {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required().label('Current Password'),
    newPassword: Yup.string().required().label('New Password'),
    confirmPassword: Yup.string().required().label('Confirm Password'),
  });

  const onSubmit = (data) => {
    setSuccess('');
    setError('');
    if (data.newPassword !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    props.changePassword(data.currentPassword, data.newPassword);
  };

  useDidUpdateEffect(() => {
    if (!props.fetching) {
      if (props.error) {
        setError(props.error);
      } else {
        setSuccess('Password changed');
      }
    }
  }, [props.fetching]);

  // create refs for handling onSubmit functionality
  const formRef = createRef();
  const currentPasswordRef = createRef();
  const newPasswordRef = createRef();
  const confirmPasswordRef = createRef();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} testID="changePasswordScreen" keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      <Form
        initialValues={{ currentPassword: '', confirmPassword: '', newPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        ref={formRef}>
        <FormField
          ref={currentPasswordRef}
          testID="currentPasswordInput"
          name="currentPassword"
          label="Current Password"
          placeholder="Enter current password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onSubmitEditing={() => newPasswordRef?.current?.focus()}
          textContentType="password"
        />
        <FormField
          ref={newPasswordRef}
          testID="newPasswordInput"
          name="newPassword"
          label="New Password"
          placeholder="Enter new password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
          textContentType="password"
        />
        <FormField
          ref={confirmPasswordRef}
          testID="confirmPasswordInput"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter new password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onSubmitEditing={() => formRef?.current?.submitForm()}
          textContentType="password"
        />
        <FormButton testID="changePasswordSubmitButton" title={'Change Password'} />
      </Form>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    fetching: state.changePassword.fetching,
    error: state.changePassword.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (currentPassword, newPassword) => dispatch(ChangePasswordActions.changePasswordRequest(currentPassword, newPassword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);
