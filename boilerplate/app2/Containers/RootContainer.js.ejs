import React, { Component } from 'react'
import { AppState, StatusBar, View } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import AccountActions from '../Redux/AccountRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  state = {
    appState: 'active'
  }
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextAppState) => {
    // app is resuming from the background
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.getAccount()
    }
    this.setState({appState: nextAppState})
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rehydrationComplete: state.appState.rehydrationComplete,
    login: state.login.authToken
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  getAccount: () => dispatch(AccountActions.accountRequest()),
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
