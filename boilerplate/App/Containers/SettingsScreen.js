import React from 'react'
import { Alert, ScrollView, Text, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'
import t from 'tcomb-form-native'
// Styles
import styles from './Styles/SettingsScreenStyle'

let Form = t.form.Form

class SettingsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      accountModel: t.struct({
        firstName: t.String,
        lastName: t.String,
        login: t.String,
        email: t.String,
        langKey: t.String,
        activated: t.Boolean
      }),
      accountValue: this.props.account,
      options: {
        fields: {
          firstName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lastName').refs.input.focus()
          },
          lastName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus()
          },
          login: {
            hidden: true
          },
          email: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitUpdate()
          },
          langKey: {
            hidden: true
          },
          activated: {
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
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      this.props.updateAccount(value)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the update attempt complete?
    if (!newProps.updating) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Something went wrong while saving the settings', [{text: 'OK'}])
        }
      } else {
        this.setState({
          success: true
        })
        Alert.alert('Success', 'Settings updated', [{text: 'OK'}])
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
            ref='form'
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
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (account) => dispatch(AccountActions.accountUpdateRequest(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
