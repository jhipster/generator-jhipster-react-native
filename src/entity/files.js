/**
 * The files portion of the entity generator
 */
module.exports = async function (generator, igniteContext) {
  const pluralize = require('pluralize')
  const fs = require('fs-extra')
  const { getEntityFormField, getRelationshipFormField } = require('../lib/entity-helpers')
  const { ignite, strings } = igniteContext
  const { kebabCase, pascalCase, snakeCase, upperCase, camelCase, isBlank, upperFirst } = strings // eslint-disable-line

  let name = generator.name
  let searchEngine = generator.igniteConfig.searchEngine
  const props = {
    name: pluralize.singular(name),
    searchEngine,
    getEntityFormField,
    getRelationshipFormField,
    pascalCase,
    pluralName: pluralize.plural(name)
  }
  const entityFileName = `${name}.json`
  const localEntityFilePath = `.jhipster/${entityFileName}`

  let entityContainsDate = false
  let entityContainsLocalDate = false
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
    if (field.fieldType === 'LocalDate') {
      entityContainsLocalDate = true
    }
    if (field.fieldType === 'LocalDate' || field.fieldType === 'ZonedDateTime') {
      entityContainsDate = true
    }
  })
  // these lists are to prevent double imports when there are multiple relations between the same entity
  const alreadyIncludedEntities = []
  const uniqueEntityRelationships = []
  entityConfig.relationships.forEach((relation) => {
    if (relation.relationshipType === 'many-to-one') {
      relation.ownerSide = true
    }
    relation.otherEntityNamePlural = pluralize.plural(relation.otherEntityName)
    relation.relationshipNamePlural = pluralize.plural(relation.relationshipName)
    if (!alreadyIncludedEntities.includes(relation.otherEntityName)) {
      alreadyIncludedEntities.push(relation.otherEntityName)
      uniqueEntityRelationships.push(relation)
    }
  })

  entityConfig.uniqueOwnerSideRelationships = uniqueEntityRelationships.filter(relation => relation.ownerSide)
  entityConfig.ownerSideRelationships = entityConfig.relationships.filter(relation => relation.ownerSide)

  props.entityConfig = entityConfig
  props.entityContainsDate = entityContainsDate
  props.entityContainsLocalDate = entityContainsLocalDate
  props.microserviceName = entityConfig.hasOwnProperty('microserviceName') ? (entityConfig.microserviceName + '/') : ''

  const apiFilePath = `${process.cwd()}/App/Services/Api.js`
  const fixtureApiFilePath = `${process.cwd()}/App/Services/FixtureApi.js`
  const reduxIndexFilePath = `${process.cwd()}/App/Redux/index.js`
  const sagaIndexFilePath = `${process.cwd()}/App/Sagas/index.js`
  const entityScreenFilePath = `${process.cwd()}/App/Containers/EntitiesScreen.js`
  const navigationRouterFilePath = `${process.cwd()}/App/Navigation/Layouts.js`

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
  let upperSnakeCaseName = upperCase(snakeCase(props.name + 'EntityScreen')).replace(/ /g, '_')
  let upperSnakeCaseNameEdit = upperCase(snakeCase(props.name + 'EntityEditScreen')).replace(/ /g, '_')
  let upperSnakeCaseNameDetail = upperCase(snakeCase(props.name + 'EntityDetailScreen')).replace(/ /g, '_')

  // import entity screens to navigation
  const navigationDeclaration = `export const ${upperSnakeCaseName} = 'Nav.${props.name}EntityScreen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-declaration-needle',
    insert: navigationDeclaration,
    match: navigationDeclaration
  })
  const navigationDeclarationDetail = `export const ${upperSnakeCaseNameDetail} = 'Nav.${props.name}EntityDetailScreen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-declaration-needle',
    insert: navigationDeclarationDetail,
    match: navigationDeclarationDetail
  })
  const navigationDeclarationEdit = `export const ${upperSnakeCaseNameEdit} = 'Nav.${props.name}EntityEditScreen'`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-declaration-needle',
    insert: navigationDeclarationEdit,
    match: navigationDeclarationEdit
  })

  // add entity screens to navigation
  const navigationScreen = `  Navigation.registerComponentWithRedux(${upperSnakeCaseName}, () => ${props.name}EntityScreen, Provider, store)`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-registration-needle',
    insert: navigationScreen,
    match: navigationScreen
  })
  const navigationScreenDetail = `  Navigation.registerComponentWithRedux(${upperSnakeCaseNameDetail}, () => ${props.name}EntityDetailScreen, Provider, store)`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-registration-needle',
    insert: navigationScreenDetail,
    match: navigationScreenDetail
  })
  const navigationScreenEdit = `  Navigation.registerComponentWithRedux(${upperSnakeCaseNameEdit}, () => ${props.name}EntityEditScreen, Provider, store)`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-registration-needle',
    insert: navigationScreenEdit,
    match: navigationScreenEdit
  })

  const navigationMethodMain = `
export const ${camelCase(props.name)}EntityScreen = () => Navigation.push('center', {
  component: {
    name: ${upperSnakeCaseName},
    options: {
      topBar: {
        title: {
          text: '${props.pluralName}',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})`

  const navigationMethodDetail = `
export const ${camelCase(props.name)}EntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: ${upperSnakeCaseNameDetail},
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: '${props.pluralName}',
          color: Colors.snow
        }
      }
    }
  }
})`
  const navigationMethodEdit = `
export const ${camelCase(props.name)}EntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: ${upperSnakeCaseNameEdit},
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: '${props.pluralName}',
          color: Colors.snow
        }
      }
    }
  }
})`
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-method-needle',
    insert: navigationMethodMain,
    match: navigationMethodMain
  })
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-method-needle',
    insert: navigationMethodEdit,
    match: navigationMethodEdit
  })
  ignite.patchInFile(navigationRouterFilePath, {
    before: 'ignite-jhipster-navigation-method-needle',
    insert: navigationMethodDetail,
    match: navigationMethodDetail
  })
  // add entity to entities screen
  const entityScreenButton = `        <RoundedButton text='${props.name}' onPress={${camelCase(props.name)}EntityScreen} />`
  ignite.patchInFile(entityScreenFilePath, {
    before: 'ignite-jhipster-entity-screen-needle',
    insert: entityScreenButton,
    match: entityScreenButton
  })
  const entityScreenImport = `  ${camelCase(props.name)}EntityScreen,`
  ignite.patchInFile(entityScreenFilePath, {
    before: 'ignite-jhipster-entity-screen-import-needle',
    insert: entityScreenImport,
    match: entityScreenImport
  })
}
