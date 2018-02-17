const fs = require('fs-extra')
const Insight = require('../lib/insight')
const jhiCore = require('jhipster-core')

module.exports = async function (context) {
  // grab some features
  const { parameters, print, strings, system } = context
  const { isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate import-jdl <jdl-filename>\n`)
    print.info('A JDL filename is required.')
    return
  }

  // load the ignite config and set the default jhipster directory
  const jdlFiles = parameters.array
  print.info('The jdl is being parsed.')
  const jhipsterConfig = await fs.readJson(`.jhipster/yo-rc.json`)
  const prodDatabaseType = jhipsterConfig['generator-jhipster'].prodDatabaseType
  const applicationType = jhipsterConfig['generator-jhipster'].applicationType
  const baseName = jhipsterConfig['generator-jhipster'].baseName
  try {
    const jdlObject = jhiCore.convertToJDLFromConfigurationObject({
      document: jhiCore.parseFromFiles(jdlFiles),
      databaseType: prodDatabaseType,
      applicationType: applicationType,
      applicationName: baseName
    })
    const entities = jhiCore.convertToJHipsterJSON({
      jdlObject,
      databaseType: prodDatabaseType,
      applicationType: applicationType
    })
    print.info('Writing entity JSON files.')
    this.changedEntities = jhiCore.exportEntities({
      entities,
      forceNoFiltering: false
    })

    this.updatedKeys = Object.keys(this.changedEntities)
    if (this.updatedKeys.length > 0) {
      print.info(`Updated entities: ${this.updatedKeys}`)
    } else {
      print.info('No change in entity configurations. No entities were updated')
    }

    // generate update entities
    for (let i = 0; i < this.updatedKeys.length; i++) {
      await system.spawn(`ignite g entity ${this.updatedKeys[i]}`, { stdio: 'inherit' })
    }

    print.success(`JDL successfully imported!`)
  } catch (e) {
    print.error('\nError while parsing entities from JDL\n')
    if (e && e.message) {
      print.error(`${e.name || ''}: ${e.message}`)
    }
  }
  Insight.trackGenerator(context, 'import-jdl')
}
