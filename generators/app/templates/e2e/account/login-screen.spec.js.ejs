const {
  reloadApp,
  loginAsUser,
  logout,
  waitForElementToBeVisibleById,
  waitForElementToBeVisibleByLabel,
  navigateToLoginScreen,
  waitThenTapButton,
} = require('../utils');

describe('Login Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should show an alert on log in failure', async () => {
    await navigateToLoginScreen();
    await element(by.id('loginScreenUsername')).replaceText('invalid');
    await element(by.id('loginScreenPassword')).replaceText('invalid');
    await waitThenTapButton('loginScreenLoginButton')
    const expectedLabel = 'Bad credentials';
    await waitForElementToBeVisibleByLabel(expectedLabel);
    await expect(element(by.label(expectedLabel))).toBeVisible();
  });

  it('should log in and log out as user successfully', async () => {
    await loginAsUser();
    await waitForElementToBeVisibleById('homeScreen');
    await expect(element(by.id('authDisplayTrue'))).toBeVisible();
    await logout();
    await waitForElementToBeVisibleById('homeScreen');
    await expect(element(by.id('authDisplayFalse'))).toBeVisible();
  });
});
