const fs = require('fs-extra')
const Insight = require('../lib/insight')
const { importJDL } = require('../lib/import-jdl')
const generateFiles = require('../entity/files')

module.exports = {
  description: 'Imports a JHipster JDL file and generates the entities within the file.',
  run: async function(context) {
    // grab some features
    const { ignite, parameters, print, strings } = context
    const { isBlank } = strings
    this.igniteConfig = ignite.loadIgniteConfig()

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${context.runtime.brand} generate import-jdl <jdl-filename>\n`)
      print.info('A JDL filename is required.')
      return
    }

    // load the ignite config and set the default jhipster directory
    let jdlFiles = parameters.array
    // this is only true when generating the app from a JDL file
    if (parameters.options.jdl) {
      jdlFiles = [`${parameters.options.jdl.startsWith('/') ? '' : '../../'}${parameters.options.jdl}`]
    }
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
        if (parameters.options.regenerate) {
          print.info('Regenerate Flag - regenerating all entities')
          fs.readdirSync('.jhipster')
            .filter(file => file !== 'yo-rc.json')
            .forEach(file => {
              entityNames.push(file.split('.')[0])
            })
        }
      }

      print.success(entityNames)
      // generate update entities
      for (let i = 0; i < entityNames.length; i++) {
        this.name = entityNames[i]
        print.success(`Generating ${this.name}`)
        await generateFiles(this, context)
        // await system.spawn(`ignite g entity ${entityNames[i]}`, { stdio: 'inherit' })
      }

      print.success(`JDL successfully imported!`)
    } catch (e) {
      print.error('\nError while parsing entities from JDL\n')
      if (e && e.message) {
        print.error(`${e.name || ''}: ${e.message}`)
      }
    }
    Insight.trackGenerator(context, 'import-jdl')
  },
}
