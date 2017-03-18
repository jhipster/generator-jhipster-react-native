import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import LoginActions from '../Redux/LoginRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.rehydrationComplete) {
      this.props.loadLogin()
    }
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
    rehydrationComplete: state.appState.rehydrationComplete
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loadLogin: () => dispatch(LoginActions.loginLoad())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
