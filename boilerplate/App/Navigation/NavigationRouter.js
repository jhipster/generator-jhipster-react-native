import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
// ignite-jhipster-navigation-import-needle

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={styles.navBar} titleStyle={styles.title} leftButtonIconStyle={styles.leftButton} rightButtonTextStyle={styles.rightButton}>
            <Scene initial key='launchScreen' component={LaunchScreen} title='Welcome' />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
            <Scene key='register' component={RegisterScreen} title='Register' />
            <Scene key='settings' component={SettingsScreen} title='Settings' />
            <Scene key='changePassword' component={ChangePasswordScreen} title='Change Password' />
            <Scene key='forgotPassword' component={ForgotPasswordScreen} title='Forgot Password' />
            {/* ignite-jhipster-navigation-needle */}
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
