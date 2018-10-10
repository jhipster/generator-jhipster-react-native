import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PasswordActions from '../Redux/PasswordRedux'
import t from 'tcomb-form-native'
// Styles
import styles from './Styles/ChangePasswordScreenStyle'

let Form = t.form.Form

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
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('newPassword').refs.input.focus()
          },
          newPassword: {
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            secureTextEntry: true,
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
        Alert.alert('Error', 'Passwords do not match', [{text: 'OK'}])
        return
      }
      this.props.changePassword(value.currentPassword, value.newPassword)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the changePassword attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        Alert.alert('Error', newProps.error, [{text: 'OK'}])
      } else {
        this.setState({
          success: true
        })
        Alert.alert('Success', 'Password changed', [{text: 'OK'}])
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
            <Text style={styles.buttonText}>Save</Text>
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
    changePassword: (currentPassword, newPassword) => dispatch(PasswordActions.changePasswordRequest(currentPassword, newPassword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
