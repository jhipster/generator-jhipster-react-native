const fs = require('fs-extra')

/**
 * The files portion of the entity generator
 */
module.exports = async function (context, props, jhipsterConfig) {
  const { filesystem, ignite, print, strings, parameters } = context
  const { camelCase, upperFirst } = strings
  const spinner = print.spin(`using the ${print.colors.blue('JHipster')} boilerplate`).succeed()

  // this is needed because the "upgrade "command is run from within an app, while the "new" command is run from one level deeper
  const jhipsterPathPrefix = parameters.rawCommand.startsWith('upgrade') ? '' : '../'

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

  // copy our App, Tests, and storybook directories
  spinner.text = '▸ copying files'
  spinner.start()
  await filesystem.copy(`${__dirname}/../../boilerplate/App`, `${process.cwd()}/App`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  await filesystem.copy(`${__dirname}/../../boilerplate/Tests`, `${process.cwd()}/Tests`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  await filesystem.copy(`${__dirname}/../../boilerplate/storybook`, `${process.cwd()}/storybook`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.js' },
    { template: 'README.md', target: 'README.md' },
    { template: 'ignite.json.ejs', target: 'ignite/ignite.json' },
    { template: '.editorconfig', target: '.editorconfig' },
    { template: '.babelrc', target: '.babelrc' },
    { template: '.env.example', target: '.env.example' },
    {
      template: 'App/Config/AppConfig.js.ejs',
      target: 'App/Config/AppConfig.js'
    },
    {
      template: 'App/Containers/RootContainer.js.ejs',
      target: 'App/Containers/RootContainer.js'
    },
    {
      template: 'App/Containers/DrawerContent.js.ejs',
      target: 'App/Containers/DrawerContent.js'
    },
    {
      template: 'App/Containers/LoginScreen.js.ejs',
      target: 'App/Containers/LoginScreen.js'
    },
    {
      template: 'App/Containers/RegisterScreen.js.ejs',
      target: 'App/Containers/RegisterScreen.js'
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
      template: 'Tests/Redux/LoginReduxTest.js.ejs',
      target: 'Tests/Redux/LoginReduxTest.js'
    },
    {
      template: 'App/Sagas/LoginSagas.js.ejs',
      target: 'App/Sagas/LoginSagas.js'
    },
    {
      template: 'Tests/Sagas/LoginSagaTest.js.ejs',
      target: 'Tests/Sagas/LoginSagaTest.js'
    },
    {
      template: 'App/Services/FixtureApi.js.ejs',
      target: 'App/Services/FixtureApi.js'
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
      template: 'App/Sagas/CallApiSaga.js.ejs',
      target: 'App/Sagas/CallApiSaga.js'
    },
    {
      template: 'App/Sagas/StartupSagas.js.ejs',
      target: 'App/Sagas/StartupSagas.js'
    },
    {
      template: 'Tests/Sagas/StartupSagaTest.js.ejs',
      target: 'Tests/Sagas/StartupSagaTest.js'
    },
    {
      template: 'Tests/Setup.js.ejs',
      target: 'Tests/Setup.js'
    },
    {
      template: 'storybook/storybook.ejs',
      target: 'storybook/storybook.js'
    },
    {
      template: 'App/Redux/CreateStore.js.ejs',
      target: 'App/Redux/CreateStore.js'
    }
  ]

  await ignite.copyBatch(context, templates, props, {
    quiet: true,
    directory: `${__dirname}/../../boilerplate`
  })

  /**
   * If using OIDC (OAuth2), copy the AuthInfoResource into the JHipster project
   */
  if (props.authType === 'oauth2') {
    const isMonolith = jhipsterConfig['generator-jhipster'].applicationType === 'monolith'
    if (fs.existsSync(`${jhipsterPathPrefix}${props.jhipsterDirectory}`)) {
      const oauth2Files = [
        { template: 'AuthInfoResource.java.ejs', target: `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/web/rest/AuthInfoResource.java` },
        { template: 'ResourceServerConfiguration.java.ejs', target: `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/ResourceServerConfiguration.java` }
      ]
      if (!isMonolith) {
        oauth2Files.push({ template: 'OAuth2SsoConfiguration.java.ejs', target: `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/OAuth2SsoConfiguration.java` })
      }
      await ignite.copyBatch(context, oauth2Files, props, {
        quiet: true,
        directory: `${__dirname}/../../templates/jhipster/oauth2`
      })
      const securityConfigFile = 'SecurityConfiguration'
      if (isMonolith && fs.existsSync(`${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/${securityConfigFile}.java`)) {
        await ignite.patchInFile(`${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/${securityConfigFile}.java`,
          {
            replace: '.antMatchers("/api/**").authenticated()',
            insert: '.antMatchers("/api/auth-info").permitAll()\n            .antMatchers("/api/**").authenticated()'
          }
        )
      }
    }
  } else {
    // remove OAuth2 files if not enabled
    await filesystem.remove('App/Lib/GenerateNonce.js')
    await filesystem.remove('App/Transforms/ParseOauthResponse.js')
    await filesystem.remove('App/Fixtures/getOauthInfo.json')
    await filesystem.remove('App/Fixtures/getOauthIssuerInfo.json')
  }

  /**
   * If using websockets, set it up
   */
  if (props.websockets) {
    spinner.text = '▸ setting up websocket code'
    spinner.start()
    // import ChatRedux in redux/index.js
    await ignite.patchInFile('App/Redux/index.js', {
      before: 'ignite-jhipster-redux-store-import-needle',
      insert: `  chat: require('./ChatRedux').reducer,`,
      match: `  chat: require('./ChatRedux').reducer,`
    })

    // wire ChatScreen in NavigationRouter
    const navigationRouterFilePath = `${process.cwd()}/App/Navigation/NavigationRouter.js`
    const navigationImportEdit = `import ChatScreen from '../Containers/ChatScreen'`
    await ignite.patchInFile(navigationRouterFilePath, {
      before: 'ignite-jhipster-navigation-import-needle',
      insert: navigationImportEdit,
      match: navigationImportEdit
    })

    // add chat screen to navigation
    const navigationScreen = `            <Scene key='chat' component={ChatScreen} title='Chat' back />`
    await ignite.patchInFile(navigationRouterFilePath, {
      before: 'ignite-jhipster-navigation-needle',
      insert: navigationScreen,
      match: navigationScreen
    })

    // copy the WebsocketConfiguration.java to the jhipsterDirectory
    if (fs.existsSync(`${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/WebsocketConfiguration.java`)) {
      await ignite.patchInFile(`${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/WebsocketConfiguration.java`, { replace: '"/websocket/tracker"', insert: '"/websocket/tracker", "/websocket/chat"' })
    }
    spinner.stop()
  } else {
    await filesystem.remove('App/Containers/ChatScreen.js')
    await filesystem.remove('App/Containers/Styles/ChatScreenStyle.js')
    await filesystem.remove('App/Services/WebsocketService.js')
    await filesystem.remove('Tests/Services/WebsocketServiceTest.js')
    await filesystem.remove('App/Sagas/WebsocketSagas.js')
    await filesystem.remove('Tests/Sagas/WebsocketSagaTest.js')
    await filesystem.remove('App/Redux/ChatRedux.js')
    await filesystem.remove('Tests/Redux/ChatReduxTest.js')
  }
}
