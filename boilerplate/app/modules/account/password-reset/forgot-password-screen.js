import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import t from 'tcomb-form-native'

import ForgotPasswordActions from './forgot-password.reducer'
import styles from './forgot-password-screen.styles'

let Form = t.form.Form

class ForgotPasswordScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formModel: t.struct({
        email: t.String
      }),
      formValue: this.props.forgotPassword,
      formOptions: {
        email: {
          returnKeyType: 'done',
          onSubmitEditing: () => this.submitForm()
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
      this.props.resetPassword(value.email)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the update attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Something when wrong resetting your password', [{text: 'OK'}])
        }
      } else {
        this.setState({
          success: true
        })
        Alert.alert('Success', 'Password reset email sent', [{text: 'OK'}])
        NavigationActions.pop()
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
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.password.fetching,
    error: state.password.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(ForgotPasswordActions.forgotPasswordRequest(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
