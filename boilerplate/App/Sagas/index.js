import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import JHIPSTER_API from '../Services/JhipsterApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { ForgotPasswordTypes } from '../Redux/ForgotPasswordRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { AccountTypes } from '../Redux/AccountRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, loginLoad } from './LoginSagas'
import { register } from './RegisterSagas'
import { forgotPasswordRequest } from './ForgotPasswordSagas'
import { getUserAvatar } from './GithubSagas'
import { openScreen } from './OpenScreenSagas'
import { getAccount } from './AccountSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
// todo set up fixtures for the JHipster API
const jhipsterApi = JHIPSTER_API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, jhipsterApi),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, jhipsterApi),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, jhipsterApi),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, jhipsterApi),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPasswordRequest, jhipsterApi),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, jhipsterApi),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ]
}
