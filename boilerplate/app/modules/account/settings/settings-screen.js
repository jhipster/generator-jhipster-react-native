import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'

import AccountActions from '../../../shared/reducers/account.reducer'
// Styles
import styles from './settings-screen.styles'

const Form = t.form.Form

class SettingsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      accountModel: t.struct({
        firstName: t.maybe(t.String),
        lastName: t.maybe(t.String),
        login: t.String,
        email: t.maybe(t.String),
        langKey: t.String,
        activated: t.Boolean
      }),
      accountValue: this.props.account,
      options: {
        fields: {
          firstName: {
            returnKeyType: 'next',
            testID: 'firstNameInput',
            onSubmitEditing: () => this.refs.form.getComponent('lastName').refs.input.focus()
          },
          lastName: {
            returnKeyType: 'next',
            testID: 'lastNameInput',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus()
          },
          login: {
            hidden: true
          },
          email: {
            returnKeyType: 'done',
            testID: 'emailInput',
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
          Alert.alert('Error', 'Something went wrong while saving the settings', [{ text: 'OK' }])
        }
      } else if (!this.state.success) {
        this.setState({
          success: true
        })
        Alert.alert('Success', 'Settings updated', [{ text: 'OK' }])
        this.props.getAccount()
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
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.accountModel}
            options={this.state.options}
            value={this.state.accountValue}
            onChange={this.accountChange}
          />
          <TouchableHighlight testID='settingsSubmitButton' style={styles.button} onPress={this.submitUpdate} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
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
    updateAccount: (account) => dispatch(AccountActions.accountUpdateRequest(account)),
    getAccount: () => dispatch(AccountActions.accountRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
