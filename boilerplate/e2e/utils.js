const navigateToLoginScreen = async () => {
  await expect(element(by.id('launchScreen'))).toBeVisible()
  await element(by.id('menuButton')).tap()
  await element(by.id('loginDrawerButton')).tap()
  await expect(element(by.id('loginScreenUsername'))).toBeVisible()
}

const loginAsUser = async () => {
  await navigateToLoginScreen()
  await element(by.id('loginScreenUsername')).replaceText('user')
  await element(by.id('loginScreenPassword')).replaceText('user')
  await element(by.id('loginScreenLoginButton')).tap()
}

const logout = async () => {
  await element(by.id('menuButton')).tap()
  await element(by.id('logoutDrawerButton')).tap()
}

module.exports = {
  navigateToLoginScreen,
  loginAsUser,
  logout
}
