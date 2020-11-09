const { printJHipsterLogo } = require('./print-jhipster-logo');
const { setupVariables } = require('./setup-variables');
const { mergeReactNativePackageJson } = require('./merge-react-native-package-json');
const { removeYoResolve, createEarlyFiles } = require('./pre-write');
const { generateReactNativeApp } = require('./react-native-init');
const { appendGitIgnore } = require('./append-git-ignore');
const { patchReactNativeNavigation } = require('./patch-react-native-navigation');
const { patchDetox } = require('./patch-detox');
const { patchWebsockets } = require('./patch-websockets');
const { patchOauth } = require('./patch-oauth');

module.exports = {
    printJHipsterLogo,
    setupVariables,
    mergeReactNativePackageJson,
    removeYoResolve,
    createEarlyFiles,
    generateReactNativeApp,
    appendGitIgnore,
    patchReactNativeNavigation,
    patchDetox,
    patchWebsockets,
    patchOauth,
};
