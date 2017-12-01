// @cliDescription  Generates an entity component, redux, saga, api, listings, styles, and optional tests.
const pluralize = require('pluralize')

module.exports = async function (context) {
  // grab some features
  const { ignite, parameters, print, prompt, strings } = context
  const { kebabCase, pascalCase, snakeCase, camelCase, isBlank, upperFirst } = strings // eslint-disable-line
  const prompts = require('./entity/prompts')
  const fs = require('fs-extra')
  // const config = ignite.loadIgniteConfig()
  // const { tests } = config

  // flags
  const jhDirectoryFlag = parameters.options['jh-dir'] || ''

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate entity <name>\n`)
    print.info('A name is required.')
    return
  }

  // load the ignite config and set the default jhipster directory
  const igniteConfigPath = 'ignite/ignite.json'
  let igniteConfig = await fs.readJson(igniteConfigPath)
  prompts.entityPrompts[0].default = igniteConfig.jhipsterDirectory
  const searchEngine = igniteConfig.searchEngine

  // read some configuration
  const name = pascalCase(parameters.first)
  const props = {
    name,
    searchEngine,
    pluralName: pluralize(name)
  }
  const entityFileName = `${name}.json`
  const localEntityFilePath = `.jhipster/${entityFileName}`

  let fullEntityFilePath
  let jhipsterDirectory

  // if the file exists, skip loading it
  if (fs.existsSync(localEntityFilePath)) {
    print.success(`Found the entity config locally in .jhipster`)
  } else if (jhDirectoryFlag) {
    if (!fs.existsSync(`${jhDirectoryFlag}/${localEntityFilePath}`)) {
      print.error(`No entity configuration file found at ${jhDirectoryFlag}/${localEntityFilePath}`)
      return
    }
    print.success(`Found the entity config at ${jhDirectoryFlag}/${localEntityFilePath}`)
    jhipsterDirectory = jhDirectoryFlag
    fullEntityFilePath = `${jhDirectoryFlag}/.jhipster/${localEntityFilePath}`
  } else {
    // prompt the user until an entity configuration file is found
    while (true) {
      let entityAnswers = await prompt.ask(prompts.entityPrompts)
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

    if (!fs.existsSync(`.jhipster`)) {
      fs.mkdirSync(`.jhipster`)
    }

    await fs.copy(fullEntityFilePath, localEntityFilePath)
    print.success(`Entity config saved to your app's .jhipster folder.`)

    // save the jhipster app directory to the ignite config as the new jhipsterDirectory default
    igniteConfig.jhipsterDirectory = jhipsterDirectory
    await fs.writeJson(igniteConfigPath, igniteConfig, { spaces: '\t' })
  }

  // load the entity config into memory
  let entityConfig = await fs.readJson(localEntityFilePath)
  props.entityConfig = entityConfig
  props.microserviceName = entityConfig.hasOwnProperty('microserviceName') ? (entityConfig.microserviceName + '/') : ''

  const apiFilePath = `${process.cwd()}/App/Services/Api.js`
  const fixtureApiFilePath = `${process.cwd()}/App/Services/FixtureApi.js`
  const reduxIndexFilePath = `${process.cwd()}/App/Redux/index.js`
  const sagaIndexFilePath = `${process.cwd()}/App/Sagas/index.js`
  const entityScreenFilePath = `${process.cwd()}/App/Containers/EntitiesScreen.js`
  const navigationRouterFilePath = `${process.cwd()}/App/Navigation/NavigationRouter.js`

  // REDUX AND SAGA SECTION
  let apiMethods = `
  const get${props.name} = (${camelCase(props.name)}Id) => api.get('${props.microserviceName}api/${kebabCase(props.pluralName)}/' + ${camelCase(props.name)}Id)
  const get${props.pluralName} = (options) => api.get('${props.microserviceName}api/${kebabCase(props.pluralName)}', options)
  const update${props.name} = (${camelCase(props.name)}) => api.put('${props.microserviceName}api/${kebabCase(props.pluralName)}', ${camelCase(props.name)})
  const delete${props.name} = (${camelCase(props.name)}Id) => api.delete('${props.microserviceName}api/${kebabCase(props.pluralName)}/' + ${camelCase(props.name)}Id)`

  let fixtureApiMethods = `
  update${props.name}: (${camelCase(props.name)}) => {
    return {
      ok: true,
      data: require('../Fixtures/update${props.name}.json')
    }
  },
  get${props.pluralName}: () => {
    return {
      ok: true,
      data: require('../Fixtures/get${props.pluralName}.json')
    }
  },
  get${props.name}: (${camelCase(props.name)}Id) => {
    return {
      ok: true,
      data: require('../Fixtures/get${props.name}.json')
    }
  },
  delete${props.name}: (${camelCase(props.name)}Id) => {
    return {
      ok: true
    }
  },`

  let apiMethodsExport = `
    update${props.name},
    get${props.pluralName},
    get${props.name},
    delete${props.name},`

  let sagaConnections = `
    takeLatest(${props.name}Types.${snakeCase(props.name).toUpperCase()}_REQUEST, get${props.name}, api),
    takeLatest(${props.name}Types.${snakeCase(props.name).toUpperCase()}_ALL_REQUEST, get${props.pluralName}, api),
    takeLatest(${props.name}Types.${snakeCase(props.name).toUpperCase()}_UPDATE_REQUEST, update${props.name}, api),
    takeLatest(${props.name}Types.${snakeCase(props.name).toUpperCase()}_DELETE_REQUEST, delete${props.name}, api),`

  // add searchEngine methods
  if (props.searchEngine) {
    apiMethods += `
  const search${props.pluralName} = (query) => api.get('${props.microserviceName}api/_search/${kebabCase(props.pluralName)}', { query: query })`

    fixtureApiMethods += `
  search${props.pluralName}: (query) => {
    return {
      ok: true,
      data: require('../Fixtures/search${props.pluralName}.json')
    }
  },`

    apiMethodsExport += `
    search${props.pluralName},`
    sagaConnections += `
    takeLatest(${props.name}Types.${snakeCase(props.name).toUpperCase()}_SEARCH_REQUEST, search${props.pluralName}, api),`
  }

  // add methods to api
  ignite.patchInFile(apiFilePath, {
    before: 'ignite-jhipster-api-method-needle',
    insert: apiMethods,
    match: apiMethods
  })
  ignite.patchInFile(apiFilePath, {
    before: 'ignite-jhipster-api-export-needle',
    insert: apiMethodsExport,
    match: apiMethodsExport
  })
  ignite.patchInFile(fixtureApiFilePath, {
    before: 'ignite-jhipster-api-fixture-needle',
    insert: fixtureApiMethods,
    match: fixtureApiMethods
  })

  // import redux in redux/index.js
  ignite.patchInFile(reduxIndexFilePath, {
    before: 'ignite-jhipster-redux-store-import-needle',
    insert: `  ${camelCase(props.pluralName)}: require('./${props.name}Redux').reducer,`,
    match: `  ${camelCase(props.pluralName)}: require('./${props.name}Redux').reducer,`
  })

  // import saga/redux in sagas/index.js
  ignite.patchInFile(sagaIndexFilePath, {
    before: 'ignite-jhipster-saga-redux-import-needle',
    insert: `import { ${props.name}Types } from '../Redux/${props.name}Redux'`,
    match: `import { ${props.name}Types } from '../Redux/${props.name}Redux'`
  })
  ignite.patchInFile(sagaIndexFilePath, {
    before: 'ignite-jhipster-saga-method-import-needle',
    insert: `import { get${props.name}, get${props.pluralName}, update${props.name}, delete${props.name}${props.searchEngine ? `, search${props.pluralName}` : ''} } from './${props.name}Sagas'`,
    match: `import { get${props.name}, get${props.pluralName}, update${props.name}, delete${props.name}${props.searchEngine ? `, search${props.pluralName}` : ''} } from './${props.name}Sagas'`
  })

  ignite.patchInFile(sagaIndexFilePath, {
    before: 'ignite-jhipster-saga-redux-connect-needle',
    insert: sagaConnections,
    match: sagaConnections
  })

  const entityFiles = [
    // generate entity saga/redux
    {
      template: `saga.ejs`,
      target: `App/Sagas/${props.name}Sagas.js`
    },
    {
      template: `redux.ejs`,
      target: `App/Redux/${props.name}Redux.js`
    },
    // generate entity listing container
    {
      template: `entity-flatlist.ejs`,
      target: `App/Containers/${props.name}EntityScreen.js`
    },
    {
      template: `entity-flatlist-style.ejs`,
      target: `App/Containers/Styles/${props.name}EntityScreenStyle.js`
    },
    {
      template: `entity-detail-screen-style.ejs`,
      target: `App/Containers/Styles/${props.name}EntityDetailScreenStyle.js`
    },
    {
      template: `entity-detail-screen.ejs`,
      target: `App/Containers/${props.name}EntityDetailScreen.js`
    },
    {
      template: `entity-edit-screen-style.ejs`,
      target: `App/Containers/Styles/${props.name}EntityEditScreenStyle.js`
    },
    {
      template: `entity-edit-screen.ejs`,
      target: `App/Containers/${props.name}EntityEditScreen.js`
    },
    // generate entity fixtures
    {
      template: `fixtures/entity-get.json.ejs`,
      target: `App/Fixtures/get${props.name}.json`
    },
    {
      template: `fixtures/entity-get-all.json.ejs`,
      target: `App/Fixtures/get${props.pluralName}.json`
    },
    {
      template: `fixtures/entity-update.json.ejs`,
      target: `App/Fixtures/update${props.name}.json`
    },
    // generate entity tests
    {
      template: `saga-test.ejs`,
      target: `Tests/Sagas/${props.name}SagaTest.js`
    },
    {
      template: `redux-test.ejs`,
      target: `Tests/Redux/${props.name}ReduxTest.js`
    }
  ]

  if (props.searchEngine) {
    entityFiles.push({
      template: `fixtures/entity-get-all.json.ejs`,
      target: `App/Fixtures/search${props.pluralName}.json`
    })
  }

  await ignite.copyBatch(context, entityFiles, props)

  // import entity screens to navigation
  const navigationImport = `import ${props.name}EntityScreen from '../Containers/${props.name}EntityScreen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-import-needle',
    insert: navigationImport,
    match: navigationImport
  })
  const navigationImportDetail = `import ${props.name}EntityDetailScreen from '../Containers/${props.name}EntityDetailScreen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-import-needle',
    insert: navigationImportDetail,
    match: navigationImportDetail
  })
  const navigationImportEdit = `import ${props.name}EntityEditScreen from '../Containers/${props.name}EntityEditScreen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-import-needle',
    insert: navigationImportEdit,
    match: navigationImportEdit
  })

  // add entity screens to navigation
  const navigationScreen = `            <Scene key='${camelCase(props.name)}Entity' component={${props.name}EntityScreen} title='${props.pluralName}' back />`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-needle',
    insert: navigationScreen,
    match: navigationScreen
  })
  const navigationScreenDetail = `            <Scene key='${camelCase(props.name)}EntityDetail' component={${props.name}EntityDetailScreen} title='${props.name}' back />`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-needle',
    insert: navigationScreenDetail,
    match: navigationScreenDetail
  })
  const navigationScreenEdit = `            <Scene key='${camelCase(props.name)}EntityEdit' component={${props.name}EntityEditScreen} title='${props.name}' back />`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-needle',
    insert: navigationScreenEdit,
    match: navigationScreenEdit
  })

  // add entity to entities screen
  const entityScreenButton = `        <RoundedButton text='${props.name}' onPress={NavigationActions.${camelCase(props.name)}Entity} />`
  ignite.patchInFile(entityScreenFilePath, {
    before: 'ignite-jhipster-entity-screen-needle',
    insert: entityScreenButton,
    match: entityScreenButton
  })
}
