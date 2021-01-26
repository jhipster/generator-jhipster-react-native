const { printJHipsterLogo } = require('./print-jhipster-logo');
const { loadVariables, setupVariables } = require('./setup-variables');
const { mergeReactNativePackageJson } = require('./merge-react-native-package-json');
const { createEarlyFiles } = require('./pre-write');
const { generateReactNativeApp } = require('./generate-react-native-app');
const { appendFiles } = require('./append-files');
const { getAppFolder } = require('./get-app-folder');
const { patchNavigationForEntity } = require('./patch-navigation');
const { patchInFile } = require('./patch-in-file');
const { patchEntityApi } = require('./patch-entity-api');
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
  patchInFile,
  patchNavigationForEntity,
  patchEntityApi,
  getEntityFormField,
  getRelationshipFormField,
  getFieldValidateType,
  getEntityFormFieldType,
};
