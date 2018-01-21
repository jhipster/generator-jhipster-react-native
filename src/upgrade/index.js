const Insight = require('../lib/insight')
const generateFiles = require('../boilerplate/files')
const { getReactNativeVersion } = require('../lib/react-native-version')
const name = require('../../package.json').name

module.exports = async function (context) {
  // grab some features
  const { ignite, print } = context

  // load the ignite config and set the default jhipster directory
  this.igniteConfig = ignite.loadIgniteConfig()
  const templateProps = {
    name,
    igniteVersion: ignite.version,
    reactNativeVersion: getReactNativeVersion(context),
    authType: this.igniteConfig.authType,
    searchEngine: this.igniteConfig.searchEngine,
    websockets: this.igniteConfig.websockets,
    socialLogin: this.igniteConfig.socialLogin
  }

  this.params = templateProps
  this.templateProps = templateProps
  await generateFiles(this, context)

  Insight.trackGenerator(context, 'upgrade')
  print.success(`Application successfully upgraded!`)
}
