const { printJHipsterLogo } = require('./print-jhipster-logo');
const { loadVariables, setupVariables } = require('./setup-variables');
const { mergeReactNativePackageJson } = require('./merge-react-native-package-json');
const { createEarlyFiles } = require('./pre-write');
const { generateReactNativeApp } = require('./generate-react-native-app');
const { appendFiles } = require('./append-files');
const { getAppFolder } = require('./get-app-folder');
const { patchReactNativeNavigation, patchNavigationForEntity } = require('./patch-navigation');
const { patchDetox } = require('./patch-detox');
const { patchWebsockets } = require('./patch-websockets');
const { patchOauth } = require('./patch-oauth');
const { patchInFile } = require('./patch-in-file');
const { patchEntityApi } = require('./patch-entity-api');
const { patchUriScheme } = require('./patch-uri-scheme');
const { getEntityFormField, getRelationshipFormField, getFieldValidateType, getEntityFormFieldType } = require('./entity-helpers');

module.exports = {
    printJHipsterLogo,
    loadVariables,
    setupVariables,
    mergeReactNativePackageJson,
    createEarlyFiles,
    generateReactNativeApp,
    appendFiles,
    getAppFolder,
    patchReactNativeNavigation,
    patchDetox,
    patchWebsockets,
    patchOauth,
    patchInFile,
    patchNavigationForEntity,
    patchEntityApi,
    getEntityFormField,
    getRelationshipFormField,
    getFieldValidateType,
    getEntityFormFieldType,
    patchUriScheme,
};
