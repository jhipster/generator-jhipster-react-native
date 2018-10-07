const fs = require('fs-extra')
const Insight = require('../lib/insight')
const importJDL = require('../lib/import-jdl').importJDL

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
  print.info('The JDL is being parsed.')
  const jhipsterConfig = await fs.readJson(`.jhipster/yo-rc.json`)
  const prodDatabaseType = jhipsterConfig['generator-jhipster'].prodDatabaseType
  const applicationType = jhipsterConfig['generator-jhipster'].applicationType
  const baseName = jhipsterConfig['generator-jhipster'].baseName
  try {
    const importState = importJDL(jdlFiles, prodDatabaseType, applicationType, baseName, print)
    let entityNames = []
    if (importState.exportedEntities.length > 0) {
      entityNames = importState.exportedEntities.map(exportedEntity => exportedEntity.name)
      print.info(`Found entities: ${entityNames.join(', ')}.`)
    } else {
      print.info('No change in entity configurations, no entities were updated.')
    }

    print.success(entityNames)
    // generate update entities
    for (let i = 0; i < entityNames.length; i++) {
      console.log(`ignite g entity ${entityNames[i]}`)
      await system.spawn(`ignite g entity ${entityNames[i]}`, { stdio: 'inherit' })
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
