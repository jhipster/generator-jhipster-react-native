const options = require('./options')
const { merge, pipe, assoc, omit, __ } = require('ramda')
const { getReactNativeVersion } = require('./lib/react-native-version')

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

  // interactive prompts - ask for auth (if UAA, get basepath)
  let jhipsterAnswers
  let pluginAnswers
  if (parameters.options.max) {
    jhipsterAnswers = options.answers.max
    pluginAnswers = options.answers.max
  } else if (parameters.options.min) {
    jhipsterAnswers = options.answers.min
    pluginAnswers = options.answers.min
  } else if (parameters.options.jwt) {
    jhipsterAnswers = options.answers.jwt
    pluginAnswers = options.answers.jwt
  } else if (parameters.options.uaa) {
    jhipsterAnswers = options.answers.uaa
    pluginAnswers = options.answers.uaa
  } else if (parameters.options.oauth2) {
    jhipsterAnswers = options.answers.oauth2
    pluginAnswers = options.answers.oauth2
  } else {
    jhipsterAnswers = await prompt.ask(options.jhipsterQuestions)
    pluginAnswers = await prompt.ask(options.pluginQuestions)
  }

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({
    name,
    version: getReactNativeVersion(context)
  })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // remove the __tests__ directory that come with React Native
  filesystem.remove('__tests__')

  // copy our App & Tests directories
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(`${__dirname}/boilerplate/App`, `${process.cwd()}/App`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  filesystem.copy(`${__dirname}/boilerplate/Tests`, `${process.cwd()}/Tests`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.ios.js' },
    { template: 'index.js.ejs', target: 'index.android.js' },
    { template: 'README.md', target: 'README.md' },
    { template: 'ignite.json.ejs', target: 'ignite/ignite.json' },
    { template: '.editorconfig', target: '.editorconfig' },
    {
      template: 'App/Config/AppConfig.js.ejs',
      target: 'App/Config/AppConfig.js'
    },
    {
      template: 'App/Containers/RootContainer.js.ejs',
      target: 'App/Containers/RootContainer.js'
    },
    {
      template: 'App/Services/Api.js.ejs',
      target: 'App/Services/Api.js'
    },
    {
      template: 'App/Redux/LoginRedux.js.ejs',
      target: 'App/Redux/LoginRedux.js'
    },
    {
      template: 'App/Sagas/LoginSagas.js.ejs',
      target: 'App/Sagas/LoginSagas.js'
    },
    {
      template: 'App/Fixtures/login.json.ejs',
      target: 'App/Fixtures/login.json'
    },
    {
      template: 'App/Sagas/index.js.ejs',
      target: 'App/Sagas/index.js'
    },
    {
      template: 'Tests/Setup.js.ejs',
      target: 'Tests/Setup.js'
    }
  ]
  const templateProps = {
    name,
    igniteVersion: ignite.version,
    reactNativeVersion: rnInstall.version,
    authType: jhipsterAnswers['auth-type'],
    vectorIcons: pluginAnswers['vector-icons'],
    animatable: pluginAnswers['animatable'],
    i18n: pluginAnswers['i18n']
  }
  await ignite.copyBatch(context, templates, templateProps, {
    quiet: true,
    directory: `${ignite.ignitePluginPath()}/boilerplate`
  })

  /**
   * Append to files
   */
  // https://github.com/facebook/react-native/issues/12724
  filesystem.appendAsync('.gitattributes', '*.bat text eol=crlf')

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
    // mini version of `ignite add ir-jhipster` here -- but faster
    const moduleName = 'ignite-jhipster'

    const perfStart = (new Date()).getTime()
    const spinner = print.spin(`adding ${print.colors.cyan(moduleName)}`)

    const boilerplate = parameters.options.b || parameters.options.boilerplate || moduleName
    await system.spawn(`ignite add ${moduleName} ${debugFlag}`, { stdio: 'inherit' })

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

    await system.spawn(`ignite add ignite-ir-boilerplate-2016 ${debugFlag}`, { stdio: 'inherit' })

    // now run install of Ignite Plugins
    if (pluginAnswers['dev-screens'] === 'Yes') {
      await system.spawn(`ignite add dev-screens ${debugFlag}`, { stdio: 'inherit' })
    }

    if (pluginAnswers['vector-icons'] === 'react-native-vector-icons') {
      await system.spawn(`ignite add vector-icons ${debugFlag}`, { stdio: 'inherit' })
    }

    // todo handle i18n
    // if (pluginAnswers['i18n'] === 'react-native-i18n') {
    //   await system.spawn(`ignite add i18n ${debugFlag}`, { stdio: 'inherit' })
    // }

    if (pluginAnswers['animatable'] === 'react-native-animatable') {
      await system.spawn(`ignite add animatable ${debugFlag}`, { stdio: 'inherit' })
    }

    if (parameters.options.lint !== 'false') {
      await system.spawn(`ignite add standard ${debugFlag}`, { stdio: 'inherit' })
    }
  } catch (e) {
    ignite.log(e)
    throw e
  }

  // git configuration
  const gitExists = await filesystem.exists('./.git')
  if (!gitExists && !parameters.options['skip-git'] && system.which('git')) {
    // initial git
    const spinner = print.spin('configuring git')

    // TODO: Make husky hooks optional
    const huskyCmd = '' // `&& node node_modules/husky/bin/install .`
    system.run(`git init . && git add . && git commit -m "Initial commit." ${huskyCmd}`)

    spinner.succeed(`configured git`)
  }

  const perfDuration = parseInt(((new Date()).getTime() - perfStart) / 10) / 100
  spinner.succeed(`ignited ${print.colors.yellow(name)} in ${perfDuration}s`)

  // Wrap it up with our success message.
  print.info('')
  print.info('🍽 Time to get cooking!')
  print.info('')
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
