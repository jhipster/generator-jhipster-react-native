const Utils = require('./utils')

describe('Login Screen Tests', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should close on cancel button press', async () => {
    await Utils.navigateToLoginScreen()
    await element(by.id('loginScreenCancelButton')).tap()
    await expect(element(by.id('launchScreen'))).toBeVisible()
  })

  it('should show an alert on log in failure', async () => {
    await Utils.navigateToLoginScreen()
    await element(by.id('loginScreenUsername')).replaceText('invalid')
    await element(by.id('loginScreenPassword')).replaceText('invalid')
    await element(by.id('loginScreenLoginButton')).tap()
    await expect(element(by.text('Invalid login'))).toBeVisible()
    await element(by.text('OK')).tap()
    await element(by.id('loginScreenCancelButton')).tap()
  })

  it('should log in as user successfully', async () => {
    await Utils.loginAsUser()
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await expect(element(by.id('logoutDrawerButton'))).toBeVisible()
  })

  it('should log out successfully', async () => {
    await element(by.id('menuButton')).tap()
    await element(by.id('logoutDrawerButton')).tap()
    await element(by.id('menuButton')).tap()
    await expect(element(by.id('loginDrawerButton'))).toBeVisible()
  })
})
