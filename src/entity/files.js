/**
 * The files portion of the entity generator
 */
module.exports = async function (generator, igniteContext) {
  const pluralize = require('pluralize')
  const fs = require('fs-extra')
  const { getEntityFormField } = require('../lib/entity-helpers')
  const { ignite, strings } = igniteContext
  const { kebabCase, pascalCase, snakeCase, camelCase, isBlank, upperFirst } = strings // eslint-disable-line

  let name = generator.name
  let searchEngine = generator.igniteConfig.searchEngine
  const props = {
    name: pluralize.singular(name),
    searchEngine,
    getEntityFormField,
    pluralName: pluralize.plural(name)
  }
  const entityFileName = `${name}.json`
  const localEntityFilePath = `.jhipster/${entityFileName}`

  // load the entity config into memory
  let entityConfig = await fs.readJson(localEntityFilePath)
  entityConfig.fields.forEach((field) => {
    field.fieldIsEnum = ![
      'String',
      'Integer',
      'Long',
      'Float',
      'Double',
      'BigDecimal',
      'LocalDate',
      'Instant',
      'ZonedDateTime',
      'Boolean',
      'byte[]',
      'ByteBuffer'
    ].includes(field.fieldType)
  })

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
  const create${props.name} = (${camelCase(props.name)}) => api.post('${props.microserviceName}api/${kebabCase(props.pluralName)}', ${camelCase(props.name)})
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
    create${props.name},
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

  await ignite.copyBatch(igniteContext, entityFiles, props)

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
  const navigationScreen = `            <Scene key='${camelCase(props.name)}Entity' component={${props.name}EntityScreen} title='${props.pluralName}' back drawerLockMode='locked-closed' />`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-needle',
    insert: navigationScreen,
    match: navigationScreen
  })
  const navigationScreenDetail = `            <Scene key='${camelCase(props.name)}EntityDetail' component={${props.name}EntityDetailScreen} title='${props.name}' back drawerLockMode='locked-closed' />`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-needle',
    insert: navigationScreenDetail,
    match: navigationScreenDetail
  })
  const navigationScreenEdit = `            <Scene key='${camelCase(props.name)}EntityEdit' component={${props.name}EntityEditScreen} title='${props.name}' back drawerLockMode='locked-closed' />`
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
