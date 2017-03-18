import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RegisterActions from '../Redux/RegisterRedux'
import t from 'tcomb-form-native'
// Styles
import styles from './Styles/RegisterScreenStyle'

let Form = t.form.Form;

class RegisterScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      accountModel: t.struct({
        login: t.String,
        password: t.String,
        confirmPassword: t.String,
        email: t.String,
        langKey: t.String
      }),
      accountValue: { login: null, password: null, confirmPassword: null, email: null, langKey: 'en' },
      options: {
        fields: {
          login: {
            label: 'Username'
          },
          password: {
            secureTextEntry: true
          },
          confirmPassword: {
            secureTextEntry: true
          },
          langKey: {
            hidden: true
          }
        }
      },
      success: false
    }
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
  }

  submitUpdate () {
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
      this.props.register(value)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the register attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        alert(newProps.error)
      } else {
        this.setState({
          success: true
        })
        alert("Registration Successful\nPlease check your email")
        NavigationActions.pop()
      }
    }
  }

  accountChange (newValue) {
    this.setState({
      accountValue: newValue
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Form
            ref="form"
            type={this.state.accountModel}
            options={this.state.options}
            value={this.state.accountValue}
            onChange={this.accountChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitUpdate} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.register.fetching,
    error: state.register.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (account) => dispatch(RegisterActions.registerRequest(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
