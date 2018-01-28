const Insight = require('../lib/insight')
const generateFiles = require('../boilerplate/files')
const { getReactNativeVersion } = require('../lib/react-native-version')
const fs = require('fs-extra')

module.exports = async function (context) {
  // grab some features
  const { ignite, print } = context

  // load the ignite config and set the default jhipster directory
  this.igniteConfig = ignite.loadIgniteConfig()
  const props = {
    name: this.igniteConfig.name,
    igniteVersion: ignite.version,
    reactNativeVersion: getReactNativeVersion(context),
    authType: this.igniteConfig.authType,
    searchEngine: this.igniteConfig.searchEngine,
    websockets: this.igniteConfig.websockets,
    jhipsterDirectory: this.igniteConfig.jhipsterDirectory,
    socialLogin: this.igniteConfig.socialLogin
  }

  const jhipsterConfig = await fs.readJson('.jhipster/.yo-rc.json')
  await generateFiles(context, props, jhipsterConfig)

  Insight.trackGenerator(context, 'upgrade')
  print.success(`Application successfully upgraded!`)
}
