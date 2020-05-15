/*
Copyright 2013-2018 the original author or authors from the JHipster project.

This file is part of the JHipster project, see https://www.jhipster.tech/
for more information.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// From: https://github.com/jhipster/generator-jhipster/blob/9dd6895f625615660492efbe668cc7b2d0e153e9/cli/import-jdl.js
// Slightly modified to take arguments
const jhiCore = require('jhipster-core')

/**
 * Imports the Applications and Entities defined in JDL
 * The app .yo-rc.json files and entity json files are written to disk
 */
const importJDL = (jdlFiles, prodDatabaseType, applicationType, baseName, print) => {
  const jdlImporter = jhiCore.JDLImporter.createImporterFromFiles(jdlFiles, {
    databaseType: prodDatabaseType,
    applicationType: applicationType,
    applicationName: baseName,
    // generatorVersion: generatorVersion,
    forceNoFiltering: false,
    skipYoRcGeneration: true,
    skipEntityFilesGeneration: true,
  })
  let importState = {
    exportedEntities: [],
    exportedApplications: [],
    exportedDeployments: [],
  }
  try {
    importState = jdlImporter.import()
    // print.debug(`importState exportedEntities: ${importState.exportedEntities.length}`);
    // print.debug(`importState exportedApplications: ${importState.exportedApplications.length}`);
    print.info('The JDL has been successfully parsed')
  } catch (error) {
    if (error) {
      const errorName = `${error.name}:` || ''
      const errorMessage = error.message || ''
      print.error(`${errorName} ${errorMessage}`)
    }
    print.error(`Error while parsing applications and entities from the JDL ${error}`)
  }
  return importState
}

module.exports = {
  importJDL,
}
