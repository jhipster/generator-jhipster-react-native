const Utils = require('./utils')

describe('Change Password Screen Tests', () => {
  before(async () => {
    await device.reloadReactNative()
    await Utils.loginAsUser()
  })
  after(async () => {
    await element(by.type('_UIBackButtonContainerView')).tap()
    await Utils.logout()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await navigateToChangePasswordScreen()
  })

  const navigateToChangePasswordScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('changePasswordDrawerButton')).tap()
  }

  const changePassword = async (oldPassword, newPassword) => {
    await element(by.id('currentPasswordInput')).replaceText(oldPassword)
    await element(by.id('newPasswordInput')).replaceText(newPassword)
    await element(by.id('confirmPasswordInput')).replaceText(newPassword)
    await element(by.id('changePasswordSubmitButton')).tap()
  }

  it('should display the change password form', async () => {
    await expect(element(by.id('currentPasswordInput'))).toBeVisible()
    await expect(element(by.id('newPasswordInput'))).toBeVisible()
    await expect(element(by.id('confirmPasswordInput'))).toBeVisible()
  })

  it('should display a popup on change password success', async () => {
    await changePassword('user', 'new-password')
    await expect(element(by.text('Password changed'))).toBeVisible()
    await element(by.text('OK')).tap()
    await changePassword('new-password', 'user')
    await expect(element(by.text('Password changed'))).toBeVisible()
    await element(by.text('OK')).tap()
  })

  it('should display a popup on change password failure', async () => {
    await changePassword('invalid-password', 'invalid-password')
    await expect(element(by.text('Error'))).toBeVisible()
    await element(by.text('OK')).tap()
  })
})
