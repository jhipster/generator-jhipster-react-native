import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import PasswordActions from '../Redux/PasswordRedux'
import t from 'tcomb-form-native'
// Styles
import styles from './Styles/ChangePasswordScreenStyle'

let Form = t.form.Form;

class ChangePasswordScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      formModel: t.struct({
        password: t.String,
        confirmPassword: t.String
      }),
      formValue: { password: null, confirmPassword: null },
      formOptions: {
        fields: {
          password: {
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
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      if (value.password !== value.confirmPassword) {
        alert("Passwords do not match")
        return;
      }
      this.props.changePassword(value.password)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the changePassword attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        alert(newProps.error)
      } else {
        this.setState({
          success: true
        })
        alert("Password changed")
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
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Form
            ref="form"
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </ScrollView>
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
    changePassword: (account) => dispatch(PasswordActions.changePasswordRequest(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
