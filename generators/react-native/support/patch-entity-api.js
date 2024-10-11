function patchEntityApi(application, entity) {
  const apiFilePath = 'app/shared/services/api.js';
  const fixtureApiFilePath = 'app/shared/services/fixture-api.js';
  const reduxIndexFilePath = 'app/shared/reducers/index.js';
  const sagaIndexFilePath = 'app/shared/sagas/index.js';
  const microservicePath = application.microserviceAppName ? `${application.microserviceAppName.toLowerCase()}/` : '';

  // handle backwards compatibility for update method
  const updateMethod = application.useOldPutMappingCode
    ? `const update${entity.entityNameCapitalized} = (${entity.entityInstance}) => api.put('${microservicePath}api/${entity.entityApiUrl}', ${entity.entityInstance});`
    : `const update${entity.entityNameCapitalized} = (${entity.entityInstance}) => api.put(\`${microservicePath}api/${entity.entityApiUrl}/\${${entity.entityInstance}.id}\`, ${entity.entityInstance});`;

  // REDUX AND SAGA SECTION
  let apiMethods = `
  const get${entity.entityNameCapitalized} = (${entity.entityInstance}Id) => api.get('${microservicePath}api/${entity.entityApiUrl}/' + ${entity.entityInstance}Id);
  const getAll${entity.entityNamePlural} = (options) => api.get('${microservicePath}api/${entity.entityApiUrl}', options);
  const create${entity.entityNameCapitalized} = (${entity.entityInstance}) => api.post('${microservicePath}api/${entity.entityApiUrl}', ${entity.entityInstance});
  ${updateMethod}
  const delete${entity.entityNameCapitalized} = (${entity.entityInstance}Id) => api.delete('${microservicePath}api/${entity.entityApiUrl}/' + ${entity.entityInstance}Id);`;

  let fixtureApiMethods = `  update${entity.entityNameCapitalized}: (${entity.entityInstance}) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-${entity.entityFileName}.json'),
    };
  },
  getAll${entity.entityNamePlural}: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-${entity.entityNamePluralizedAndSpinalCased}.json'),
    };
  },
  get${entity.entityNameCapitalized}: (${entity.entityInstance}Id) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-${entity.entityFileName}.json'),
    };
  },
  delete${entity.entityNameCapitalized}: (${entity.entityInstance}Id) => {
    return {
      ok: true,
    };
  },`;

  let apiMethodsExport = `
    create${entity.entityNameCapitalized},
    update${entity.entityNameCapitalized},
    getAll${entity.entityNamePlural},
    get${entity.entityNameCapitalized},
    delete${entity.entityNameCapitalized},`;

  let sagaConnections = `
    takeLatest(${entity.entityNameCapitalized}Types.${entity.entityNameSnakeCase.toUpperCase()}_REQUEST, ${
      entity.entityNameCapitalized
    }Sagas.get${entity.entityNameCapitalized}, api),
    takeLatest(${entity.entityNameCapitalized}Types.${entity.entityNameSnakeCase.toUpperCase()}_ALL_REQUEST, ${
      entity.entityNameCapitalized
    }Sagas.getAll${entity.entityNamePlural}, api),
    takeLatest(${entity.entityNameCapitalized}Types.${entity.entityNameSnakeCase.toUpperCase()}_UPDATE_REQUEST, ${
      entity.entityNameCapitalized
    }Sagas.update${entity.entityNameCapitalized}, api),
    takeLatest(${entity.entityNameCapitalized}Types.${entity.entityNameSnakeCase.toUpperCase()}_DELETE_REQUEST, ${
      entity.entityNameCapitalized
    }Sagas.delete${entity.entityNameCapitalized}, api),`;

  // add searchEngine methods
  if (application.searchEngineAny) {
    console.log(`SearchEngine: ${application.searchEngineAny}`);
    apiMethods += `
  const search${entity.entityNamePlural} = (query) => api.get('${microservicePath}api/_search/${entity.entityApiUrl}', { query: query })`;

    fixtureApiMethods += `
  search${entity.entityNamePlural}: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-${entity.entityNamePluralizedAndSpinalCased}.json'),
    }
  },`;

    apiMethodsExport += `
    search${entity.entityNamePlural},`;
    sagaConnections += `
    takeLatest(${entity.entityNameCapitalized}Types.${entity.entityNameSnakeCase.toUpperCase()}_SEARCH_REQUEST, ${
      entity.entityNameCapitalized
    }Sagas.search${entity.entityNamePlural}, api),`;
  }

  // add methods to api
  this.patchInFile(apiFilePath, {
    before: 'jhipster-react-native-api-method-needle',
    insert: apiMethods,
  });
  this.patchInFile(apiFilePath, {
    before: 'jhipster-react-native-api-export-needle',
    insert: apiMethodsExport,
  });
  this.patchInFile(fixtureApiFilePath, {
    before: 'jhipster-react-native-api-fixture-needle',
    insert: fixtureApiMethods,
  });

  // import redux in redux/index.js
  this.patchInFile(reduxIndexFilePath, {
    before: 'jhipster-react-native-redux-store-import-needle',
    insert: `  ${entity.entityInstancePlural}: require('../../modules/entities/${entity.entityFileName}/${entity.entityFileName}.reducer').reducer,`,
  });

  // import saga/redux in sagas/index.js
  this.patchInFile(sagaIndexFilePath, {
    before: 'jhipster-react-native-saga-redux-import-needle',
    insert: `import { ${entity.entityNameCapitalized}Types } from '../../modules/entities/${entity.entityFileName}/${entity.entityFileName}.reducer'`,
  });
  this.patchInFile(sagaIndexFilePath, {
    before: 'jhipster-react-native-saga-method-import-needle',
    insert: `import ${entity.entityNameCapitalized}Sagas from '../../modules/entities/${entity.entityFileName}/${entity.entityFileName}.sagas';`,
  });

  this.patchInFile(sagaIndexFilePath, {
    before: 'jhipster-react-native-saga-redux-connect-needle',
    insert: sagaConnections,
  });
}

export { patchEntityApi };
