import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginScreenStyles'
import { Images, Metrics } from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Invalid login', [{text: 'OK'}])
        }
      } else if (newProps.account) {
        NavigationActions.pop()
      }
    }
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }
  handlePressCancel = () => {
    this.props.logout()
    NavigationActions.pop()
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logoLogin} style={[styles.topLogo, this.state.topLogo]} />
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Username</Text>
            <TextInput
              ref='username'
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='Username' />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Password</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder='Password' />
          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressCancel}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
