const fs = require('fs-extra')
const Insight = require('../lib/insight')
const generateFiles = require('./files')
const prompts = require('./prompts')
module.exports = {
  description: 'Generates an entity component, redux, saga, api, listings, styles, and optional tests.',
  run: async function (context) {
    // grab some features
    const { ignite, parameters, print, prompt, strings } = context
    const { pascalCase, isBlank } = strings

    // flags
    const jhDirectoryFlag = parameters.options['jh-dir'] || ''

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${context.runtime.brand} generate entity <name>\n`)
      print.info('A name is required.')
      return
    }

    // load the ignite config and set the default jhipster directory
    this.igniteConfig = ignite.loadIgniteConfig()
    this.name = pascalCase(parameters.first)
    prompts.entityPrompts[0].default = this.igniteConfig.jhipsterDirectory

    // read some configuration
    const entityFileName = `${this.name}.json`
    const localEntityFilePath = `.jhipster/${entityFileName}`

    let fullEntityFilePath
    let jhipsterDirectory

    // if the file exists, skip loading it
    if (fs.existsSync(localEntityFilePath)) {
      print.success(`Found the ${this.name} entity config locally in .jhipster`)
    } else if (jhDirectoryFlag) {
      if (!fs.existsSync(`${jhDirectoryFlag}/${localEntityFilePath}`)) {
        print.error(`No entity configuration file found at ${jhDirectoryFlag}/${localEntityFilePath}`)
        return
      }
      print.success(`Found the entity config at ${jhDirectoryFlag}/${localEntityFilePath}`)
      jhipsterDirectory = jhDirectoryFlag
      fullEntityFilePath = `${jhDirectoryFlag}/${localEntityFilePath}`
    } else {
      // prompt the user until an entity configuration file is found
      while (true) {
        const entityAnswers = await prompt.ask(prompts.entityPrompts)
        // strip the trailing slash from the directory
        jhipsterDirectory = `${entityAnswers.filePath}`.replace(/\/$/, ``)
        fullEntityFilePath = `${jhipsterDirectory}/.jhipster/${entityFileName}`
        print.info(`Looking for ${fullEntityFilePath}`)
        if (fs.existsSync(fullEntityFilePath)) {
          print.success(`Found entity file at ${fullEntityFilePath}`)
          break
        } else {
          print.error(`Could not find entity file, please try again.`)
        }
      }
    }

    if (fullEntityFilePath) {
      await fs.copy(fullEntityFilePath, localEntityFilePath)
      print.success(`Entity config saved to your app's .jhipster folder.`)
    }
    if (jhipsterDirectory) {
      // save the jhipster app directory to the ignite config as the new jhipsterDirectory default
      this.igniteConfig.jhipsterDirectory = jhipsterDirectory
      await fs.writeJson('ignite/ignite.json', this.igniteConfig, { spaces: '\t' })
    }
    await generateFiles(this, context)

    Insight.trackGenerator(context, 'entity')
    print.success(`Entity successfully generated!`)
  },
}
