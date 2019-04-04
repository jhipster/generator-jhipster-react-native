const Utils = require('./utils')

describe('Settings Screen Tests', () => {
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
    await navigateToSettingsScreen()
  })

  const navigateToSettingsScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('settingsDrawerButton')).tap()
  }

  it('should display the settings form', async () => {
    await expect(element(by.id('firstNameInput'))).toBeVisible()
    await expect(element(by.id('lastNameInput'))).toBeVisible()
    await expect(element(by.id('emailInput'))).toBeVisible()
    await expect(element(by.id('settingsSubmitButton'))).toBeVisible()
  })

  it('should display a popup on settings update success', async () => {
    await element(by.id('settingsSubmitButton')).tap()
    await expect(element(by.text('Settings updated'))).toBeVisible()
    await element(by.text('OK')).tap()
  })

  it('should display a popup on settings update failure', async () => {
    await element(by.id('emailInput')).replaceText('invalid-email')
    await element(by.id('settingsSubmitButton')).tap()
    await expect(element(by.text('Error'))).toBeVisible()
    await element(by.text('OK')).tap()
  })
})
