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
  await filesystem.copy(`${__dirname}/../../boilerplate/app`, `${process.cwd()}/app`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  await filesystem.copy(`${__dirname}/../../boilerplate/test`, `${process.cwd()}/test`, {
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
      template: 'app/config/app-config.js.ejs',
      target: 'app/config/app-config.js'
    },
    {
      template: 'app/root-container.js.ejs',
      target: 'app/root-container.js'
    },
    {
      template: 'app/navigation/drawer/drawer-content.js.ejs',
      target: 'app/navigation/drawer/drawer-content.js'
    },
    {
      template: 'app/modules/login/login-screen.js.ejs',
      target: 'app/modules/login/login-screen.js'
    },
    {
      template: 'app/modules/account/register/register-screen.js.ejs',
      target: 'app/modules/account/register/register-screen.js'
    },
    {
      template: 'app/shared/services/api.js.ejs',
      target: 'app/shared/services/api.js'
    },
    {
      template: 'app/modules/login/login.reducer.js.ejs',
      target: 'app/modules/login/login.reducer.js'
    },
    {
      template: 'test/spec/modules/login/login.reducer.spec.js.ejs',
      target: 'test/spec/modules/login/login.reducer.spec.js'
    },
    {
      template: 'app/modules/login/login.sagas.js.ejs',
      target: 'app/modules/login/login.sagas.js'
    },
    {
      template: 'test/spec/modules/login/login.sagas.spec.js.ejs',
      target: 'test/spec/modules/login/login.sagas.spec.js'
    },
    {
      template: 'app/shared/services/fixture-api.js.ejs',
      target: 'app/shared/services/fixture-api.js'
    },
    {
      template: 'app/shared/fixtures/login.json.ejs',
      target: 'app/shared/fixtures/login.json'
    },
    {
      template: 'app/shared/sagas/index.js.ejs',
      target: 'app/shared/sagas/index.js'
    },
    {
      template: 'app/shared/sagas/call-api.saga.js.ejs',
      target: 'app/shared/sagas/call-api.saga.js'
    },
    {
      template: 'app/shared/sagas/startup.saga.js.ejs',
      target: 'app/shared/sagas/startup.saga.js'
    },
    {
      template: 'test/spec/shared/sagas/startup.saga.spec.js.ejs',
      target: 'test/spec/shared/sagas/startup.saga.spec.js'
    },
    {
      template: 'test/setup.js.ejs',
      target: 'test/setup.js'
    },
    {
      template: 'test/storybook/storybook.ejs',
      target: 'test/storybook/storybook.js'
    },
    {
      template: 'app/shared/reducers/create-store.js.ejs',
      target: 'app/shared/reducers/create-store.js'
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
    if (fs.existsSync(`${jhipsterPathPrefix}${props.jhipsterDirectory}`)) {
      const oauth2Files = [
        { template: 'AuthInfoResource.java.ejs', target: `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/web/rest/AuthInfoResource.java` },
        jhipsterConfig['generator-jhipster'].applicationType === 'monolith'
          ? { template: 'ResourceServerConfiguration.java.ejs', target: `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/ResourceServerConfiguration.java` }
          : { template: 'OAuth2SsoConfiguration.java.ejs', target: `${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/OAuth2SsoConfiguration.java` }
      ]
      await ignite.copyBatch(context, oauth2Files, props, {
        quiet: true,
        directory: `${__dirname}/../../templates/jhipster/oauth2`
      })
      const securityConfigFile = (jhipsterConfig['generator-jhipster'].applicationType === 'monolith') ? 'SecurityConfiguration' : 'OAuth2SsoConfiguration'
      if (fs.existsSync(`${jhipsterPathPrefix}${props.jhipsterDirectory}/src/main/java/${props.packageFolder}/config/${securityConfigFile}.java`)) {
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
    await filesystem.remove('app/shared/utils/generate-nonce.js')
    await filesystem.remove('app/shared/utils/parse-oauth-response.js')
    await filesystem.remove('app/shared/fixtures/getOauthInfo.json')
    await filesystem.remove('app/shared/fixtures/getOauthIssuerInfo.json.json')
  }

  /**
   * If using websockets, set it up
   */
  if (props.websockets) {
    spinner.text = '▸ setting up websocket code'
    spinner.start()
    // import ChatRedux in redux/index.js
    await ignite.patchInFile('app/shared/reducers/index.js', {
      before: 'ignite-jhipster-redux-store-import-needle',
      insert: `  chat: require('../../modules/chat/chat.reducer').reducer,`,
      match: `  chat: require('../../modules/chat/chat.reducer').reducer,`
    })

    // wire ChatScreen in NavigationRouter
    const navigationRouterFilePath = `${process.cwd()}/app/navigation/navigation-router.js`
    const navigationImportEdit = `import ChatScreen from '../modules/chat/chat-screen'`
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
    await filesystem.remove('app/modules/chat/')
    await filesystem.remove('app/shared/websockets/')
    await filesystem.remove('test/spec/shared/websockets/')
    await filesystem.remove('test/spec/modules/chat/')
  }
}
