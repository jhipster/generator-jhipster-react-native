import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Metrics } from '../Themes'
import * as simpleAuthProviders from 'react-native-simple-auth'
import AppConfig from '../Config/AppConfig'

// Styles
import styles from './Styles/SocialLoginContainerStyle'

class SocialLoginContainer extends React.Component {
  socialLogin = (provider) => {
    simpleAuthProviders[provider](AppConfig.social[provider])
      .then((info) => {
        console.tron.log(info)
        switch (provider) {
          case 'twitter':
            this.props.attemptSocialLogin(info.credentials.oauth_token, info.credentials.oauth_token_secret, provider)
            break
          default:
            // google, facebook, and other OAuth2 providers
            this.props.attemptSocialLogin(info.credentials.access_token, '', provider)
            break
        }
        // info.user - user details from the provider
        // info.credentials - tokens from the provider
      }).catch((error) => {
        console.tron.log(error)
        // error.code
        // error.description
      })
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (!newProps.fetching && newProps.account) {
      NavigationActions.pop()
    }
  }

  render () {
    return (
      <View style={[styles.loginRow]}>
        <Icon.Button style={{width: Metrics.screenWidth / 4}} name='facebook' backgroundColor='#3b5998' onPress={this.socialLogin.bind(this, 'facebook')}>
          <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>Facebook</Text>
        </Icon.Button>
        <Icon.Button style={{width: Metrics.screenWidth / 4}} name='twitter' backgroundColor='#4099FF' onPress={this.socialLogin.bind(this, 'twitter')}>
          <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>Twitter</Text>
        </Icon.Button>
        <Icon.Button style={{width: Metrics.screenWidth / 4}} name='google' backgroundColor='#dd4b39' onPress={this.socialLogin.bind(this, 'google')}>
          <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>Google</Text>
        </Icon.Button>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.account.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSocialLogin: (token, secret, provider) => dispatch(LoginActions.socialLoginRequest(token, secret, provider))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialLoginContainer)
