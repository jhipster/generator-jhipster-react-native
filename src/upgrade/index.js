const Insight = require('../lib/insight')
const generateFiles = require('../boilerplate/files')
const { getReactNativeVersion } = require('../lib/react-native-version')
const fs = require('fs-extra')

module.exports = {
  description: 'Upgrades an existing IgniteJHipster project to the latest boilerplate code.',
  run: async function (context) {
    // grab some features
    const { ignite, print, system, parameters } = context

    // load the ignite config and set the default jhipster directory
    this.igniteConfig = ignite.loadIgniteConfig()
    const props = {
      name: this.igniteConfig.name,
      igniteVersion: ignite.version,
      reactNativeVersion: getReactNativeVersion(context),
      authType: this.igniteConfig.authType,
      searchEngine: this.igniteConfig.searchEngine,
      websockets: this.igniteConfig.websockets,
      detox: this.igniteConfig.detox,
      jhipsterDirectory: this.igniteConfig.jhipsterDirectory,
    }

    const jhipsterConfig = await fs.readJson('.jhipster/yo-rc.json')
    await generateFiles(context, props, jhipsterConfig)

    // run prettier to pass lint on generation
    const useNpm = Boolean(parameters.options.npm) || !system.which('yarn')
    await system.run(`${useNpm ? 'npm' : 'yarn'} run prettier`, { stdio: 'ignore' })

    Insight.trackGenerator(context, 'upgrade')
    print.success(`Application successfully upgraded!`)
  },
}
