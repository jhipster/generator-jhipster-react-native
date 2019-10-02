const fs = require('fs-extra')
const semver = require('semver')

/**
 * The files portion of the entity generator
 */
module.exports = async function(context, props, jhipsterConfig) {
  const { filesystem, print, strings } = context
  const { camelCase, upperFirst } = strings
  const { copyBatch } = require('../lib/copy-batch')
  const spinner = print.spin(`using the ${print.colors.blue('JHipster')} boilerplate`).succeed()
  const { patchInFile } = require('../lib/patch-in-file')

  // this is needed because the "upgrade "command is run from within an app, while the "new" command is run from one level deeper
  // if the ignite/ignite.json file exists (created below), it's an upgrade, otherwise it's a new app
  const jhipsterPathPrefix = fs.existsSync('ignite/ignite.json') ? '' : '../'

  if (props.authType === 'uaa') {
    props.uaaBaseUrl = jhipsterConfig['generator-jhipster'].uaaBaseName.toLowerCase()
  }

  // used for JHipster templates
  props.packageName = jhipsterConfig['generator-jhipster'].packageName
  props.packageFolder = jhipsterConfig['generator-jhipster'].packageFolder
  props.baseName = jhipsterConfig['generator-jhipster'].baseName
  props.databaseType = jhipsterConfig['generator-jhipster'].databaseType
  props.angularAppName = camelCase(props.baseName) + (props.baseName.endsWith('App') ? '' : 'App')
  const main = upperFirst(props.angularAppName)
  const acceptableForJava = new RegExp('^[A-Z][a-zA-Z0-9_]*$')
  props.mainClass = acceptableForJava.test(main) ? main : 'Application'

  props.jhipsterVersion = jhipsterConfig['generator-jhipster'].jhipsterVersion
  // used for the session auth change in v5.8.2 that removed the `j_` from login parameters. remove this in the future
  props.oldSessionAuthParameters = false
  if (props.jhipsterVersion && semver.lt(props.jhipsterVersion, '5.8.2')) {
    props.oldSessionAuthParameters = true
  }

  // copy our App, Tests, and storybook directories
  spinner.text = '▸ copying files'
  spinner.start()
  await filesystem.copy(`${__dirname}/../../boilerplate/app`, `${process.cwd()}/app`, {
    overwrite: true,
    matching: '!*.ejs',
  })
  await filesystem.copy(`${__dirname}/../../boilerplate/test`, `${process.cwd()}/test`, {
    overwrite: true,
    matching: '!*.ejs',
  })
  await filesystem.copy(`${__dirname}/../../boilerplate/storybook`, `${process.cwd()}/storybook`, {
    overwrite: true,
    matching: '!*.ejs',
  })
  await filesystem.copy(`${__dirname}/../../boilerplate/patches`, `${process.cwd()}/patches`, {
    overwrite: true,
    matching: '!*.ejs',
  })
  if (props.detox) {
    await filesystem.copy(`${__dirname}/../../boilerplate/e2e`, `${process.cwd()}/e2e`, {
      overwrite: true,
      matching: '!*.ejs',
    })
    // remove account files if oauth is used
    if (props.authType === 'oauth2') {
      await filesystem.remove(`${process.cwd()}/e2e/account`)
    }
    // remove websocket ChatScreen test if unused
    if (!props.websockets) {
      await filesystem.remove(`${process.cwd()}/e2e/websockets`)
    }
  }
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.js' },
    { template: '.eslintrc.js', target: '.eslintrc.js' },
    { template: '.prettierrc.js', target: '.prettierrc.js' },
    { template: 'README.md', target: 'README.md' },
    { template: 'ignite.json.ejs', target: 'ignite/ignite.json' },
    { template: '.editorconfig', target: '.editorconfig' },
    { template: 'babel.config.js', target: 'babel.config.js' },
    { template: '.env.example', target: '.env.example' },
    {
      template: 'app/config/app-config.js.ejs',
      target: 'app/config/app-config.js',
    },
    {
      template: 'app/navigation/drawer/drawer-content.js.ejs',
      target: 'app/navigation/drawer/drawer-content.js',
    },
    {
      template: 'app/navigation/layouts.js.ejs',
      target: 'app/navigation/layouts.js',
    },
    {
      template: 'app/modules/home/learn-more-links.component.js.ejs',
      target: 'app/modules/home/learn-more-links.component.js',
    },
    {
      template: 'app/modules/login/login-screen.js.ejs',
      target: 'app/modules/login/login-screen.js',
    },
    {
      template: 'app/modules/account/register/register-screen.js.ejs',
      target: 'app/modules/account/register/register-screen.js',
    },
    {
      template: 'app/shared/services/api.js.ejs',
      target: 'app/shared/services/api.js',
    },
    {
      template: 'app/modules/login/login.reducer.js.ejs',
      target: 'app/modules/login/login.reducer.js',
    },
    {
      template: 'test/spec/modules/login/login.reducer.spec.js.ejs',
      target: 'test/spec/modules/login/login.reducer.spec.js',
    },
    {
      template: 'app/modules/login/login.sagas.js.ejs',
      target: 'app/modules/login/login.sagas.js',
    },
    {
      template: 'test/spec/modules/login/login.sagas.spec.js.ejs',
      target: 'test/spec/modules/login/login.sagas.spec.js',
    },
    {
      template: 'app/shared/services/fixture-api.js.ejs',
      target: 'app/shared/services/fixture-api.js',
    },
    {
      template: 'app/shared/fixtures/login.json.ejs',
      target: 'app/shared/fixtures/login.json',
    },
    {
      template: 'app/shared/sagas/index.js.ejs',
      target: 'app/shared/sagas/index.js',
    },
    {
      template: 'app/shared/sagas/call-api.saga.js.ejs',
      target: 'app/shared/sagas/call-api.saga.js',
    },
    {
      template: 'app/shared/sagas/startup.saga.js.ejs',
      target: 'app/shared/sagas/startup.saga.js',
    },
    {
      template: 'test/spec/shared/sagas/startup.saga.spec.js.ejs',
      target: 'test/spec/shared/sagas/startup.saga.spec.js',
    },
    {
      template: 'test/setup.js.ejs',
      target: 'test/setup.js',
    },
    {
      template: 'app/shared/reducers/create-store.js.ejs',
      target: 'app/shared/reducers/create-store.js',
    },
    {
      template: 'fastlane/Appfile.ejs',
      target: 'fastlane/Appfile',
    },
    {
      template: 'fastlane/Fastfile.ejs',
      target: 'fastlane/Fastfile',
    },
    {
      template: 'fastlane/Matchfile.ejs',
      target: 'fastlane/Matchfile',
    },
    {
      template: '../templates/Podfile.ejs',
      target: `ios/Podfile`,
    },
  ]

  await copyBatch(context, templates, props, {
    quiet: true,
    directory: `${__dirname}/../../boilerplate`,
  })

  /**
   * If using OIDC (OAuth2), copy the AuthInfoResource into the JHipster project
   */
  if (props.authType === 'oauth2') {
    const isMonolith = jhipsterConfig['generator-jhipster'].applicationType === 'monolith'
    if (fs.existsSync(`${jhipsterPathPrefix}${props.jhipsterDirectory}`)) {
      const oauth2Files = []
      if (!isMonolith) {
        oauth2Files.push({
          template: 'OAuth2SsoConfiguration.java.ejs',
          target: `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/OAuth2SsoConfiguration.java`,
        })
      }
      await copyBatch(context, oauth2Files, props, {
        quiet: true,
        directory: `${__dirname}/../../templates/jhipster/oauth2`,
      })
      const keycloakConfigFile = 'src/main/docker/realm-config/jhipster-realm.json'
      if (fs.existsSync(`${jhipsterPathPrefix}${props.jhipsterDirectory}/${keycloakConfigFile}`)) {
        await patchInFile(context, `${jhipsterPathPrefix}${props.jhipsterDirectory}/${keycloakConfigFile}`, {
          replace: `"dev.localhost.ionic:*"`,
          insert: `"dev.localhost.ionic:*", "${props.name.toLowerCase()}://*"`,
        })
      }
      const securityConfigFile = 'SecurityConfiguration'
      if (
        isMonolith &&
        fs.existsSync(
          `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/${securityConfigFile}.java`,
        )
      ) {
        await patchInFile(
          context,
          `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/${securityConfigFile}.java`,
          {
            replace: '.antMatchers("/api/**").authenticated()',
            insert: '.antMatchers("/api/auth-info").permitAll()\n            .antMatchers("/api/**").authenticated()',
          },
        )
      }
    }
    const androidAuthRedirectContent = `        manifestPlaceholders = [
          appAuthRedirectScheme: '${props.name.toLowerCase()}'
        ]`
    await patchInFile(context, 'android/app/build.gradle', {
      before: 'applicationId',
      insert: androidAuthRedirectContent,
    })
  } else {
    // remove OAuth2 files if not enabled
    await filesystem.remove('app/shared/fixtures/get-oauth-info.json')
  }

  /**
   * If using websockets, set it up
   */
  if (props.websockets) {
    spinner.text = '▸ setting up websocket code'
    spinner.start()
    // import ChatRedux in redux/index.js
    await patchInFile(context, 'app/shared/reducers/index.js', {
      before: 'ignite-jhipster-redux-store-import-needle',
      insert: `  chat: require('../../modules/chat/chat.reducer').reducer,`,
    })

    // TODO CHAT SCREEN
    // wire ChatScreen in NavigationRouter
    // const navigationRouterFilePath = `${process.cwd()}/app/navigation/navigation-router.js`
    // const navigationImportEdit = `import ChatScreen from '../modules/chat/chat-screen'`
    // await patchInFile(context, navigationRouterFilePath, {
    //   before: 'ignite-jhipster-navigation-import-needle',
    //   insert: navigationImportEdit,
    //   match: navigationImportEdit
    // })
    //
    // // add chat screen to navigation
    // const navigationScreen = `            <Scene key='chat' component={ChatScreen} title='Chat' back />`
    // await patchInFile(context, navigationRouterFilePath, {
    //   before: 'ignite-jhipster-navigation-needle',
    //   insert: navigationScreen,
    //   match: navigationScreen
    // })

    // copy the WebsocketConfiguration.java to the jhipsterDirectory
    if (
      fs.existsSync(
        `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/WebsocketConfiguration.java`,
      )
    ) {
      await patchInFile(
        context,
        `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/WebsocketConfiguration.java`,
        { replace: '"/websocket/tracker"', insert: '"/websocket/tracker", "/websocket/chat"' },
      )
    }
    spinner.stop()
  } else {
    await filesystem.remove('app/modules/chat/')
    await filesystem.remove('app/shared/websockets/')
    await filesystem.remove('test/spec/shared/websockets/')
    await filesystem.remove('test/spec/modules/chat/')
  }
}
