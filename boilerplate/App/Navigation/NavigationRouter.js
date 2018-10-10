import React, { Component } from 'react'
import { Drawer, Scene, Router, Stack } from 'react-native-router-flux'
import styles from './Styles/NavigationContainerStyles'
import DrawerContent from '../Containers/DrawerContent'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import EntitiesScreen from '../Containers/EntitiesScreen'
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
        <Drawer headerTintColor={'white'} contentComponent={DrawerContent} navigationBarStyle={styles.navBar} titleStyle={styles.title}
          // these lines are a workaround for a react-navigation issue, remove after upgrading >4.0.0-beta.24
          drawerOpenRoute='DrawerOpen'
          drawerCloseRoute='DrawerClose'
          drawerToggleRoute='DrawerToggle'
        >
          <Stack key='root'>
            <Scene initial key='launchScreen' component={LaunchScreen} title='Welcome' />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar drawerLockMode='locked-closed' />
            <Scene key='register' component={RegisterScreen} title='Register' back drawerLockMode='locked-closed' />
            <Scene key='entities' component={EntitiesScreen} title='Entities' back drawerLockMode='locked-closed' />
            <Scene key='settings' component={SettingsScreen} title='Settings' back drawerLockMode='locked-closed' />
            <Scene key='changePassword' component={ChangePasswordScreen} title='Change Password' back drawerLockMode='locked-closed' />
            <Scene key='forgotPassword' component={ForgotPasswordScreen} title='Forgot Password' back drawerLockMode='locked-closed' />
            {/* ignite-jhipster-navigation-needle */}
          </Stack>
        </Drawer>
      </Router>
    )
  }
}

export default NavigationRouter
