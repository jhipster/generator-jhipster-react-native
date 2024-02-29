const {
  reloadApp,
  loginAsUser,
  logout,
  waitForElementToBeVisibleByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitForElementToBeVisibleById,
  waitThenTapButton,
} = require('../utils');

describe('Settings Screen Tests', () => {
  beforeAll(async () => {
    await reloadApp();
    await loginAsUser();
  });

  afterAll(async () => {
    await logout();
  });

  beforeEach(async () => {
    await reloadApp();
    await openAndTapDrawerMenuItemByLabel('Settings');
    await waitForElementToBeVisibleById('settingsScreen');
  });

  it('should display a success message on settings update success', async () => {
    await element(by.id('emailInput')).replaceText('user@localhost.com');
    await waitThenTapButton('settingsSubmitButton')
    const expectedLabel = 'Settings updated';
    await waitForElementToBeVisibleByLabel(expectedLabel);
    await expect(element(by.label(expectedLabel))).toBeVisible();
  });

  it('should display an error message on settings update failure', async () => {
    await element(by.id('emailInput')).replaceText('invalid-email');
    await waitThenTapButton('settingsSubmitButton')
    const expectedLabel = 'Email must be a valid email';
    await waitForElementToBeVisibleByLabel(expectedLabel);
    await expect(element(by.label(expectedLabel))).toBeVisible();
  });
});
