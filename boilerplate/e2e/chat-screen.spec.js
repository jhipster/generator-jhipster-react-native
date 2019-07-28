const Utils = require('./utils')

describe('Chat Screen Tests', () => {
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
    await navigateToChatScreen()
  })

  const navigateToChatScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('chatDrawerButton')).tap()
  }

  const sendChat = async (message) => {
    await element(by.id('chatScreenInput')).replaceText(message)
    await element(by.id('chatScreenSendButton')).tap()
  }

  it('should display the chat screen and message input', async () => {
    await expect(element(by.id('chatScreen'))).toBeVisible()
    await expect(element(by.id('chatScreenInput'))).toBeVisible()
  })

  it('should send a chat message then display it', async () => {
    await sendChat('Java Hipster')
    await expect(element(by.text('Java Hipster'))).toBeVisible()
  })
})
