const { printJHipsterLogo } = require('./print-jhipster-logo');
const { loadVariables, setupVariables } = require('./setup-variables');
const { createEarlyFiles } = require('./pre-write');
const { appendFiles } = require('./append-files');
const { getAppFolder } = require('./get-app-folder');
const { patchBabel } = require('./patch-babel');
const { patchNavigationForEntity } = require('./patch-navigation');
const { patchInFile } = require('./patch-in-file');
const { patchEntityApi } = require('./patch-entity-api');
const { getEntityFormField, getRelationshipFormField, getFieldValidateType, getEntityFormFieldType } = require('./entity-helpers');

module.exports = {
  printJHipsterLogo,
  loadVariables,
  setupVariables,
  createEarlyFiles,
  appendFiles,
  getAppFolder,
  patchBabel,
  patchInFile,
  patchNavigationForEntity,
  patchEntityApi,
  getEntityFormField,
  getRelationshipFormField,
  getFieldValidateType,
  getEntityFormFieldType,
};
