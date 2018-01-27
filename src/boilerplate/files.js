/**
 * The files portion of the entity generator
 */
module.exports = async function (igniteContext, props) {
  const { filesystem, ignite, print } = igniteContext
  const spinner = print.spin(`using the ${print.colors.blue('JHipster')} boilerplate`).succeed()

  // copy our App, Tests, and storybook directories
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(`${__dirname}/../../boilerplate/App`, `${process.cwd()}/App`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  filesystem.copy(`${__dirname}/../../boilerplate/Tests`, `${process.cwd()}/Tests`, {
    overwrite: true,
    matching: '!*.ejs'
  })
  filesystem.copy(`${__dirname}/../../boilerplate/storybook`, `${process.cwd()}/storybook`, {
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

  await ignite.copyBatch(igniteContext, templates, props, {
    quiet: true,
    directory: `${__dirname}/../../boilerplate`
  })

  /**
   * Append to files
   */
  // https://github.com/facebook/react-native/issues/12724
  filesystem.appendAsync('.gitattributes', '*.bat text eol=crlf')
  filesystem.append('.gitignore', 'coverage/')
  filesystem.append('.gitignore', '\n# Misc\n#')
  filesystem.append('.gitignore', '.env\n')
  filesystem.append('.gitignore', 'ios/Index/DataStore\n')

  /**
   * If using social login, set it up
   */
  if (props.socialLogin) {
    await ignite.addModule('react-native-simple-auth', { version: '2.2.0' })
  } else {
    filesystem.remove('App/Containers/SocialLoginContainer.js')
    filesystem.remove('App/Containers/Styles/SocialLoginContainerStyle.js')
  }
  /**
   * If using websockets, set it up
   */
  if (props.websockets) {
    spinner.text = '▸ setting up websocket code'
    spinner.start()
    // import ChatRedux in redux/index.js
    ignite.patchInFile('App/Redux/index.js', {
      before: 'ignite-jhipster-redux-store-import-needle',
      insert: `  chat: require('./ChatRedux').reducer,`,
      match: `  chat: require('./ChatRedux').reducer,`
    })

    // wire ChatScreen in NavigationRouter
    const navigationRouterFilePath = `${process.cwd()}/App/Navigation/NavigationRouter.js`
    const navigationImportEdit = `import ChatScreen from '../Containers/ChatScreen'`
    ignite.patchInFile(navigationRouterFilePath, {
      before: 'ignite-jhipster-navigation-import-needle',
      insert: navigationImportEdit,
      match: navigationImportEdit
    })

    // add chat screen to navigation
    const navigationScreen = `            <Scene key='chat' component={ChatScreen} title='Chat' back />`
    ignite.patchInFile(navigationRouterFilePath, {
      before: 'ignite-jhipster-navigation-needle',
      insert: navigationScreen,
      match: navigationScreen
    })

    // install websocket dependencies
    await ignite.addModule('stompjs', { version: '2.3.3' })
    // this is a github module for a react-native specific fix that hasn't been released yet
    await ignite.addModule('sockjs-client', { version: 'https://github.com/sockjs/sockjs-client#4d18fd56a6c4fb476c3e1931543a6cb9daaa6eba' })
    await ignite.addModule('net', { version: '1.0.2' })
    spinner.stop()
  } else {
    filesystem.remove('App/Containers/ChatScreen.js')
    filesystem.remove('App/Containers/Styles/ChatScreenStyle.js')
    filesystem.remove('App/Services/WebsocketService.js')
    filesystem.remove('Tests/Services/WebsocketServiceTest.js')
    filesystem.remove('App/Sagas/WebsocketSagas.js')
    filesystem.remove('Tests/Sagas/WebsocketSagaTest.js')
    filesystem.remove('App/Redux/ChatRedux.js')
    filesystem.remove('Tests/Redux/ChatReduxTest.js')
  }
}
