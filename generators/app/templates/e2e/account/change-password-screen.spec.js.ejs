const {
  reloadApp,
  loginAsUser,
  logout,
  waitForElementToBeVisibleByLabel,
  waitForElementToBeVisibleById,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
} = require('../utils');

describe('Change Password Screen Tests', () => {
  const password = process.env.E2E_PASSWORD || 'user';
  const updatedPassword = process.env.E2E_NEW_PASSWORD || 'new-password';

  beforeAll(async () => {
    await reloadApp();
    await loginAsUser();
  });

  afterAll(async () => {
    await logout();
  });

  beforeEach(async () => {
    await reloadApp();
    await openAndTapDrawerMenuItemByLabel('Change Password');
    await waitForElementToBeVisibleById('changePasswordScreen');
  });

  const changePassword = async (oldPassword, newPassword) => {
    await element(by.id('currentPasswordInput')).replaceText(oldPassword);
    await element(by.id('newPasswordInput')).replaceText(newPassword);
    await element(by.id('confirmPasswordInput')).replaceText(newPassword);
    await waitThenTapButton('changePasswordSubmitButton')
  };

  it('should display a success message on change password success', async () => {
    const expectedLabel = 'Password changed';
    await changePassword(password, updatedPassword);
    await waitForElementToBeVisibleByLabel(expectedLabel);
    await expect(element(by.label(expectedLabel))).toBeVisible();
    await changePassword(updatedPassword, password);
    await waitForElementToBeVisibleByLabel(expectedLabel);
    await expect(element(by.label(expectedLabel))).toBeVisible();
  });

  it('should display an error message on change password failure', async () => {
    const expectedLabel = 'Incorrect password';
    await changePassword('invalid-password', 'invalid-password');
    await waitForElementToBeVisibleByLabel(expectedLabel);
    await expect(element(by.label(expectedLabel))).toBeVisible();
  });
});
