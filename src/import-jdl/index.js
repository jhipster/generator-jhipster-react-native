const fs = require('fs-extra')
const Insight = require('../lib/insight')
const { importJDL } = require('../lib/import-jdl')
const generateFiles = require('../entity/files')

module.exports = {
  description: 'Imports a JHipster JDL file and generates the entities within the file.',
  run: async function (context) {
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
        entityNames = importState.exportedEntities.map((exportedEntity) => exportedEntity.name)
        print.info(`Found entities: ${entityNames.join(', ')}.`)
        // save entity config into json manually
        try {
          fs.mkdirpSync('.jhipster')
          importState.exportedEntities.forEach((exportedEntity) => {
            const name = exportedEntity.name
            fs.writeJsonSync(`.jhipster/${name}.json`, exportedEntity, { spaces: 2 })
          })
        } catch (e) {
          print.error(e)
        }
      } else {
        print.info('No change in entity configurations, no entities were updated.')
      }

      // regenerate all entities if the regenerate flag was sent
      if (parameters.options.regenerate) {
        print.info('Regenerate Flag - regenerating all entities')
        fs.readdirSync('.jhipster')
          .filter((file) => file !== 'yo-rc.json')
          .forEach((file) => {
            entityNames.push(file.split('.')[0])
          })
      }

      // if the JDL contained multiple applications or any deployments, delete the created directories and .yo-rc.json files
      if (importState.exportedDeployments.length > 0 || importState.exportedApplications.length > 1) {
        print.warning('Application/Deployment Folders generated, removing those folders')
        const applicationNames = importState.exportedApplications.map(
          (exportedApplication) => exportedApplication['generator-jhipster'].baseName,
        )
        const deployments = importState.exportedDeployments.map(
          (exportedDeployment) => exportedDeployment['generator-jhipster'].deploymentType,
        )
        applicationNames.concat(deployments).forEach((folder) => {
          try {
            fs.removeSync(`${folder}/.yo-rc.json`)
            fs.rmdirSync(folder)
          } catch (e) {
            print.warning(`Issue cleaning up folder: ${folder}`)
            // calling rmdir so it won't delete the folder if it contains any other files
            print.warning(`${e}`)
          }
        })
      }

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
