const { printJHipsterLogo } = require('./print-jhipster-logo');
const { loadVariables, setupVariables } = require('./setup-variables');
const { mergeReactNativePackageJson } = require('./merge-react-native-package-json');
const { createEarlyFiles } = require('./pre-write');
const { generateReactNativeApp } = require('./generate-react-native-app');
const { appendFiles } = require('./append-files');
const { patchReactNativeNavigation } = require('./patch-react-native-navigation');
const { patchDetox } = require('./patch-detox');
const { patchWebsockets } = require('./patch-websockets');
const { patchOauth } = require('./patch-oauth');

module.exports = {
    printJHipsterLogo,
    loadVariables,
    setupVariables,
    mergeReactNativePackageJson,
    createEarlyFiles,
    generateReactNativeApp,
    appendFiles,
    patchReactNativeNavigation,
    patchDetox,
    patchWebsockets,
    patchOauth,
};
