import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    github: require('./GithubRedux').reducer,
    account: require('./AccountRedux').reducer,
    login: require('./LoginRedux').reducer,
    register: require('./RegisterRedux').reducer,
    forgotPassword: require('./ForgotPasswordRedux').reducer,
    search: require('./SearchRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
