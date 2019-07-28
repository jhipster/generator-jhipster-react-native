import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'

import ChangePasswordActions from '../password/change-password.reducer'
import styles from './change-password-screen.styles'

const Form = t.form.Form

class ChangePasswordScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formModel: t.struct({
        currentPassword: t.String,
        newPassword: t.String,
        confirmPassword: t.String
      }),
      formValue: { password: null, confirmPassword: null },
      formOptions: {
        fields: {
          currentPassword: {
            secureTextEntry: true,
            testID: 'currentPasswordInput',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('newPassword').refs.input.focus()
          },
          newPassword: {
            secureTextEntry: true,
            testID: 'newPasswordInput',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            secureTextEntry: true,
            testID: 'confirmPasswordInput',
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm()
          }
        }
      },
      success: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  submitForm () {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      if (value.newPassword !== value.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }])
        return
      }
      this.props.changePassword(value.currentPassword, value.newPassword)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the changePassword attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        Alert.alert('Error', newProps.error, [{ text: 'OK' }])
      } else {
        this.setState({
          success: true
        })
        Alert.alert('Success', 'Password changed', [{ text: 'OK' }])
      }
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight testID='changePasswordSubmitButton' style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.changePassword.fetching,
    error: state.changePassword.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (currentPassword, newPassword) => dispatch(ChangePasswordActions.changePasswordRequest(currentPassword, newPassword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
