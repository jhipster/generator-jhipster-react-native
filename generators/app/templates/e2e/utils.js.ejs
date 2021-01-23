const DetoxExpoHelpers = require('detox-expo-helpers');

const username = process.env.E2E_USERNAME || 'user';
const password = process.env.E2E_PASSWORD || 'user';
const expoPublishedUrl = process.env.E2E_EXPO_URL || 'exp://localhost:19000';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitThenTapButton = async (buttonId, ms = 1000) => {
  await wait(ms);
  await element(by.id(buttonId)).tap();
};

const openAndTapDrawerMenuItemByLabel = async (label) => {
  // matching the drawer button is flaky, so open it with a swipe from the left
  await element(by.id('drawerButtonWrapper')).atIndex(0).swipe('right', 'fast', 0.7, 0.01);
  await waitForElementToBeVisibleById('drawerContentScrollView');
  await tapFirstElementByLabel(label);
};

const setDateTimePickerValue = async (elementId, dateString, dateFormat) => {
  await waitThenTapButton(elementId);
  await waitForElementToBeVisibleById(`${elementId}Modal`);
  await element(by.id(`${elementId}Modal`)).setDatePickerDate(dateString, dateFormat);
  // the first tap can be flaky, so tap it again if it still exists
  await tapFirstElementByLabel('Confirm');
  await tapFirstElementByLabel('Confirm');
  await waitForElementToBeVisibleById(elementId);
};

const setPickerValue = async (elementId, value) => {
  await waitThenTapButton(elementId);
  await waitForElementToBeVisibleById(`${elementId}Picker`);
  await element(by.id(`${elementId}Picker`)).setColumnToValue(0, value);
  await waitThenTapButton(`${elementId}PickerDone`);
  await waitForElementToBeVisibleById(elementId);
};

const navigateToLoginScreen = async () => {
  await openAndTapDrawerMenuItemByLabel('Login');
  await waitForElementToBeVisibleById('loginScreenUsername');
};

const loginAsUser = async () => {
  await navigateToLoginScreen();
  await element(by.id('loginScreenUsername')).replaceText(username);
  await element(by.id('loginScreenPassword')).replaceText(password);
  await waitThenTapButton('loginScreenLoginButton');
  try {
    await waitForElementToBeVisibleById('homeScreen')
  } catch (e) {
    throw new Error('Logging in failed. Check backend status or credentials.');
  }
};

const logout = async () => {
  await openAndTapDrawerMenuItemByLabel('Logout');
};

const goBack = async () => {
  await wait(1000);
  if (device.getPlatform() === 'ios') {
    await tapFirstElementByLabel('Back');
  } else {
    await device.pressBack();
  }
};

const toggleSwitchToValue = async (switchId, targetValue) => {
  let attributes = await element(by.id(switchId)).getAttributes();
  while (!!+attributes.value !== targetValue) {
    await element(by.id(switchId)).longPress();
    attributes = await element(by.id(switchId)).getAttributes();
  }
};

const scrollTo = async (fieldId, listId, size = 0.15, direction = 'up', speed = 'slow') => {
  await waitFor(element(by.id(fieldId)))
    .toBeVisible()
    .whileElement(by.type('ABI40_0_0RCTCustomScrollView').withAncestor(by.id(listId)))
    .scroll(500, 'down');
};

const tapFirstElementById = async (id) => {
  try {
    await element(by.id(id)).atIndex(0).tap();
  } catch (e) {
    console.warn(`Could not tap on element with ID: ${id}`);
  }
};

const tapFirstElementByLabel = async (label) => {
  try {
    await element(by.label(label)).atIndex(0).tap();
  } catch (e) {
    console.warn(`Could not tap on element with label: ${label}`);
  }
};

const waitForElementToBeVisibleByLabel = async (elementLabel, timeout = 5000) => {
  await waitFor(element(by.label(elementLabel))).toBeVisible().withTimeout(timeout);
}

const waitForElementToBeVisibleById = async (elementId, timeout = 5000) => {
  await waitFor(element(by.id(elementId))).toBeVisible().withTimeout(timeout);
}

const reloadApp = async (bailOnFailure) => {
  try {
    // disabling Detox synchronization - broken for Expo apps in Detox 18+, speeds up tests at the cost of using waitFor
    await DetoxExpoHelpers.reloadApp({ url: expoPublishedUrl, launchArgs: { detoxEnableSynchronization: false } });
    // if you eject from expo, you should replace the line above with:
    // device.reloadReactNative()
    await waitForElementToBeVisibleById('homeScreen', 15000);
    await waitForElementToBeVisibleById('drawerButton', 15000);
  } catch (e) {
    console.warn('Reloading app failed, retrying once');
    console.warn(e);
    if (!bailOnFailure) {
      await reloadApp(true);
    }
  }
};

module.exports = {
  wait,
  waitThenTapButton,
  setDateTimePickerValue,
  setPickerValue,
  openAndTapDrawerMenuItemByLabel,
  navigateToLoginScreen,
  loginAsUser,
  goBack,
  logout,
  scrollTo,
  tapFirstElementById,
  tapFirstElementByLabel,
  waitForElementToBeVisibleById,
  waitForElementToBeVisibleByLabel,
  toggleSwitchToValue,
  reloadApp,
};
