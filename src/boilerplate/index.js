const options = require('./prompts')
const { merge, pipe, assoc, omit, __ } = require('ramda')
const { getReactNativeVersion } = require('../lib/react-native-version')
const Insight = require('../lib/insight')
const generateFiles = require('./files')

/**
 * Is Android installed?
 *
 * $ANDROID_HOME/tools folder has to exist.
 *
 * @param {*} context - The gluegun context.
 * @returns {boolean}
 */
const isAndroidInstalled = function (context) {
  const androidHome = process.env['ANDROID_HOME']
  const hasAndroidEnv = !context.strings.isBlank(androidHome)
  const hasAndroid = hasAndroidEnv && context.filesystem.exists(`${androidHome}/tools`) === 'dir'

  return Boolean(hasAndroid)
}

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context.
 */
async function install (context) {
  const {
    filesystem,
    parameters,
    ignite,
    reactNative,
    print,
    system,
    prompt,
    template
  } = context

  const perfStart = (new Date()).getTime()

  const name = parameters.third
  const spinner = print
    .spin(`using the ${print.colors.blue('JHipster')} boilerplate`)
    .succeed()

  let params = {
    authType: parameters.options['auth-type'],
    searchEngine: parameters.options['search-engine'],
    websockets: parameters.options['websockets'],
    socialLogin: parameters.options['social-login'],
    devScreens: parameters.options['dev-screens'],
    animatable: parameters.options['animatable'],
    disableInsight: parameters.options['disable-insight']
  }

  if (params.authType === undefined) {
    params.authType = (await prompt.ask(options.questions.authType)).authType
  }
  if (params.searchEngine === undefined) {
    params.searchEngine = (await prompt.ask(options.questions.searchEngine)).searchEngine
  }
  if (params.websockets === undefined) {
    params.websockets = (await prompt.ask(options.questions.websockets)).websockets
  }
  if (params.socialLogin === undefined) {
    params.socialLogin = (await prompt.ask(options.questions.socialLogin)).socialLogin
  }
  if (params.devScreens === undefined) {
    params.devScreens = (await prompt.ask(options.questions.devScreens)).devScreens
  }
  if (params.animatable === undefined) {
    params.animatable = (await prompt.ask(options.questions.animatable)).animatable
  }
  if (params.disableInsight === undefined && Insight.insight.optOut === undefined) {
    Insight.insight.optOut = !((await prompt.ask(options.questions.insight)).insight)
  }

  params.skipGit = parameters.options['skip-git']
  params.skipLint = parameters.options['skip-lint']

  // very hacky but correctly handles both strings and booleans and converts to boolean
  params.searchEngine = JSON.parse(params.searchEngine)
  params.websockets = JSON.parse(params.websockets)
  params.socialLogin = JSON.parse(params.socialLogin)
  params.devScreens = JSON.parse(params.devScreens)
  params.disableInsight = JSON.parse(params.devScreens)

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({
    name,
    version: getReactNativeVersion(context)
  })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // remove the __tests__ directory that come with React Native
  filesystem.remove('__tests__')
  filesystem.remove('App.js')

  const templateProps = {
    name,
    igniteVersion: ignite.version,
    reactNativeVersion: rnInstall.version,
    authType: params.authType,
    searchEngine: params.searchEngine,
    websockets: params.websockets,
    socialLogin: params.socialLogin,
    animatable: params.animatable,
    devScreens: params.devScreens
    // i18n: params.i18n
  }

  this.params = params
  this.templateProps = templateProps
  await generateFiles(this, context)

  /**
   * Merge the package.json from our template into the one provided from react-native init.
   */
  async function mergePackageJsons () {
    // transform our package.json incase we need to replace variables
    const rawJson = await template.generate({
      directory: `${ignite.ignitePluginPath()}/boilerplate`,
      template: 'package.json.ejs',
      props: templateProps
    })
    const newPackageJson = JSON.parse(rawJson)

    // read in the react-native created package.json
    const currentPackage = filesystem.read('package.json', 'json')

    // deep merge, lol
    const newPackage = pipe(
      assoc(
        'dependencies',
        merge(currentPackage.dependencies, newPackageJson.dependencies)
      ),
      assoc(
        'devDependencies',
        merge(currentPackage.devDependencies, newPackageJson.devDependencies)
      ),
      assoc('scripts', merge(currentPackage.scripts, newPackageJson.scripts)),
      merge(
        __,
        omit(['dependencies', 'devDependencies', 'scripts'], newPackageJson)
      )
    )(currentPackage)

    // write this out
    filesystem.write('package.json', newPackage, { jsonIndent: 2 })
  }
  await mergePackageJsons()

  spinner.stop()

  // react native link -- must use spawn & stdio: ignore or it hangs!! :(
  spinner.text = `▸ linking native libraries`
  spinner.start()
  await system.spawn('react-native link', { stdio: 'ignore' })
  spinner.stop()

  // pass long the debug flag if we're running in that mode
  const debugFlag = parameters.options.debug ? '--debug' : ''

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // NOTE(steve): I'm re-adding this here because boilerplates now hold permanent files
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  try {
    // Disabled slow but reliable method here
    // await system.spawn(`ignite add ignite-jhipster ${debugFlag}`, { stdio: 'inherit' })
    // mini version of `ignite add ignite-jhipster` here -- but faster
    const moduleName = 'ignite-jhipster'

    const perfStart = (new Date()).getTime()
    const spinner = print.spin(`adding ${print.colors.cyan(moduleName)}`)

    const boilerplate = parameters.options.b || parameters.options.boilerplate || moduleName
    await system.spawn(`ignite add ${boilerplate} ${debugFlag}`, { stdio: 'inherit' })

    const ignitePluginConfigPath = `${__dirname}/ignite.json`
    const newConfig = filesystem.read(ignitePluginConfigPath, 'json')
    // const pluginModule = require(`${__dirname}/plugin.js`)
    // await pluginModule.add(context)

    ignite.setIgnitePluginPath(__dirname)
    ignite.saveIgniteConfig(newConfig)

    const perfDuration = parseInt(((new Date()).getTime() - perfStart) / 10) / 100

    spinner.text = `added ${print.colors.cyan(moduleName)} in ${perfDuration}s`
    spinner.start()
    spinner.succeed()

    await system.spawn(`ignite add ignite-ir-boilerplate ${debugFlag}`, { stdio: 'inherit' })

    // now run install of Ignite Plugins
    if (params.devScreens) {
      await system.spawn(`ignite add dev-screens ${debugFlag}`, { stdio: 'inherit' })
    }

    await system.spawn(`ignite add vector-icons ${debugFlag}`, { stdio: 'inherit' })

    // todo make a plugin?
    // await system.spawn(`ignite add cookies ${debugFlag}`, { stdio: 'inherit' })
    if (params.authType === 'session' || params.authType === 'uaa') {
      await ignite.addModule('react-native-cookies', {version: '3.2.0', link: true})
    }
    // todo handle i18n
    // if (params.i18n === 'react-native-i18n') {
    //   await system.spawn(`ignite add i18n ${debugFlag}`, { stdio: 'inherit' })
    // }

    if (params.animatable === 'react-native-animatable') {
      await system.spawn(`ignite add animatable ${debugFlag}`, { stdio: 'inherit' })
    }

    if (!params.skipLint) {
      await system.spawn(`ignite add standard ${debugFlag}`, { stdio: 'inherit' })
      // ignore the ignite folder
      let pkg = filesystem.read(`package.json`, 'json')
      pkg.standard['ignore'] = [ 'ignite/**' ]
      filesystem.write(`package.json`, pkg)
    }
  } catch (e) {
    ignite.log(e)
    throw e
  }

  // git configuration
  const gitExists = await filesystem.exists('./.git')
  if (!gitExists && !params.skipGit && system.which('git')) {
    // initial git
    const spinner = print.spin('configuring git')

    // TODO: Add git hooks flag.  Disabled by default for now
    // "husky": "0.14.3",
    const huskyCmd = '' // `&& node node_modules/husky/bin/install .`
    system.run(`git init . && git add . && git commit -m "Initial commit." ${huskyCmd}`)

    spinner.succeed(`configured git`)
  }

  const perfDuration = parseInt(((new Date()).getTime() - perfStart) / 10) / 100
  spinner.succeed(`ignited ${print.colors.yellow(name)} in ${perfDuration}s`)

  Insight.trackAppOptions(context, templateProps)

  // Wrap it up with our success message.
  print.info('')
  print.info('🍽 Time to get cooking!')
  print.info('')
  if (params.websockets) {
    print.info('To enable the websockets example, see docs/websockets.md')
    print.info('')
  }
  if (params.socialLogin) {
    print.info('To configure Social Login, see docs/social-login.md')
    print.info('')
  }
  print.info('To run in iOS:')
  print.info(print.colors.bold(`  cd ${name}`))
  print.info(print.colors.bold('  react-native run-ios'))
  print.info('')
  if (isAndroidInstalled(context)) {
    print.info('To run in Android:')
  } else {
    print.info(`To run in Android, make sure you've followed the latest react-native setup instructions at https://facebook.github.io/react-native/docs/getting-started.html before using ignite.\nYou won't be able to run ${print.colors.bold('react-native run-android')} successfully until you have. Then:`)
  }
  print.info(print.colors.bold(`  cd ${name}`))
  print.info(print.colors.bold('  react-native run-android'))
  print.info('')
  print.info('To see what ignite can do for you:')
  print.info(print.colors.bold(`  cd ${name}`))
  print.info(print.colors.bold('  ignite'))
  print.info('')
}

module.exports = {
  install
}
