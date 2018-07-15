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
    name,
    searchEngine,
    getEntityFormField,
    pluralName: pluralize(name),
    kebabName: kebabCase(name)
  }
  const entityFileName = `${name}.json`
  const localEntityFilePath = `.jhipster/${entityFileName}`

  // load the entity config into memory
  let entityConfig = await fs.readJson(localEntityFilePath)
  props.entityConfig = entityConfig
  props.microserviceName = entityConfig.hasOwnProperty('microserviceName') ? (entityConfig.microserviceName + '/') : ''

  const apiFilePath = `${process.cwd()}/app/shared/services/api.js`
  const fixtureApiFilePath = `${process.cwd()}/app/shared/services/fixture-api.js`
  const reduxIndexFilePath = `${process.cwd()}/app/shared/reducers/index.js`
  const sagaIndexFilePath = `${process.cwd()}/app/shared/sagas/index.js`
  const entityScreenFilePath = `${process.cwd()}/app/modules/entities/entities-screen.js`
  const navigationRouterFilePath = `${process.cwd()}/app/navigation/navigation-router.js`

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
      data: require('../../shared/fixtures/update${props.name}.json')
    }
  },
  get${props.pluralName}: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get${props.pluralName}.json')
    }
  },
  get${props.name}: (${camelCase(props.name)}Id) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get${props.name}.json')
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
      data: require('../../shared/fixtures/search${props.pluralName}.json')
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
    insert: `  ${camelCase(props.pluralName)}: require('../../modules/entities/${props.kebabName}/${props.kebabName}.reducer').reducer,`,
    match: `  ${camelCase(props.pluralName)}: require('../../modules/entities/${props.kebabName}/${props.kebabName}.reducer').reducer,`
  })

  // import saga/redux in sagas/index.js
  ignite.patchInFile(sagaIndexFilePath, {
    before: 'ignite-jhipster-saga-redux-import-needle',
    insert: `import { ${props.name}Types } from '../../modules/entities/${props.kebabName}/${props.kebabName}.reducer'`,
    match: `import { ${props.name}Types } from '../../modules/entities/${props.kebabName}/${props.kebabName}.reducer'`
  })
  ignite.patchInFile(sagaIndexFilePath, {
    before: 'ignite-jhipster-saga-method-import-needle',
    insert: `import { get${props.name}, get${props.pluralName}, update${props.name}, delete${props.name}${props.searchEngine ? `, search${props.pluralName}` : ''} } from '../../modules/entities/${props.kebabName}/${props.kebabName}.sagas'`,
    match: `import { get${props.name}, get${props.pluralName}, update${props.name}, delete${props.name}${props.searchEngine ? `, search${props.pluralName}` : ''} } from '../../modules/entities/${props.kebabName}/${props.kebabName}.sagas'`
  })

  ignite.patchInFile(sagaIndexFilePath, {
    before: 'ignite-jhipster-saga-redux-connect-needle',
    insert: sagaConnections,
    match: sagaConnections
  })

  const entityFiles = [
    // generate entity saga/redux
    {
      template: `entity-sagas.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}.sagas.js`
    },
    {
      template: `entity-reducer.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}.reducer.js`
    },
    // generate entity listing container
    {
      template: `entity-flatlist.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}-entity-screen.js`
    },
    {
      template: `entity-flatlist-style.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}-entity-screen-style.js`
    },
    {
      template: `entity-detail-screen.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}-entity-detail-screen.js`
    },
    {
      template: `entity-detail-screen-style.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}-entity-detail-screen-style.js`
    },
    {
      template: `entity-edit-screen.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}-entity-edit-screen.js`
    },
    {
      template: `entity-edit-screen-style.js.ejs`,
      target: `app/modules/entities/${props.kebabName}/${props.kebabName}-entity-edit-screen-style.js`
    },
    // generate entity fixtures
    {
      template: `fixtures/entity-get.json.ejs`,
      target: `app/shared/fixtures/get${props.name}.json`
    },
    {
      template: `fixtures/entity-get-all.json.ejs`,
      target: `app/shared/fixtures/get${props.pluralName}.json`
    },
    {
      template: `fixtures/entity-update.json.ejs`,
      target: `app/shared/fixtures/update${props.name}.json`
    },
    // generate entity tests
    {
      template: `entity-sagas.spec.js.ejs`,
      target: `test/spec/modules/entities/${props.kebabName}/${props.kebabName}.sagas.spec.js`
    },
    {
      template: `entity-reducer.spec.js.ejs`,
      target: `test/spec/modules/entities/${props.kebabName}/${props.kebabName}.reducer.spec.js`
    }
  ]

  if (props.searchEngine) {
    entityFiles.push({
      template: `fixtures/entity-get-all.json.ejs`,
      target: `app/shared/fixtures/search${props.pluralName}.json`
    })
  }

  await ignite.copyBatch(igniteContext, entityFiles, props, {
    directory: `${__dirname}/../../templates/entity`
  });

  // import entity screens to navigation
  const navigationImport = `import ${props.name}EntityScreen from '../modules/entities/${props.kebabName}/${props.kebabName}-entity-screen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-import-needle',
    insert: navigationImport,
    match: navigationImport
  })
  const navigationImportDetail = `import ${props.name}EntityDetailScreen from '../modules/entities/${props.kebabName}/${props.kebabName}-entity-detail-screen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-import-needle',
    insert: navigationImportDetail,
    match: navigationImportDetail
  })
  const navigationImportEdit = `import ${props.name}EntityEditScreen from '../modules/entities/${props.kebabName}/${props.kebabName}-entity-edit-screen'`
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
