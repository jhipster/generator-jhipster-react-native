function patchEntityApi() {
    const apiFilePath = 'app/shared/services/api.js';
    const fixtureApiFilePath = 'app/shared/services/fixture-api.js';
    const reduxIndexFilePath = 'app/shared/reducers/index.js';
    const sagaIndexFilePath = 'app/shared/sagas/index.js';
    const microservicePath = this.context.microserviceAppName ? `${this.context.microserviceAppName.toLowerCase()}/` : '';

    // REDUX AND SAGA SECTION
    let apiMethods = `
  const get${this.context.entityNameCapitalized} = (${this.context.entityInstance}Id) => api.get('${microservicePath}api/${this.context.entityApiUrl}/' + ${this.context.entityInstance}Id);
  const getAll${this.context.entityNamePlural} = (options) => api.get('${microservicePath}api/${this.context.entityApiUrl}', options);
  const create${this.context.entityNameCapitalized} = (${this.context.entityInstance}) => api.post('${microservicePath}api/${this.context.entityApiUrl}', ${this.context.entityInstance});
  const update${this.context.entityNameCapitalized} = (${this.context.entityInstance}) => api.put('${microservicePath}api/${this.context.entityApiUrl}', ${this.context.entityInstance});
  const delete${this.context.entityNameCapitalized} = (${this.context.entityInstance}Id) => api.delete('${microservicePath}api/${this.context.entityApiUrl}/' + ${this.context.entityInstance}Id);`;

    let fixtureApiMethods = `  update${this.context.entityNameCapitalized}: (${this.context.entityInstance}) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-${this.context.entityFileName}.json'),
    };
  },
  getAll${this.context.entityNamePlural}: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-${this.context.entityPluralFileName}.json'),
    };
  },
  get${this.context.entityNameCapitalized}: (${this.context.entityInstance}Id) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-${this.context.entityFileName}.json'),
    };
  },
  delete${this.context.entityNameCapitalized}: (${this.context.entityInstance}Id) => {
    return {
      ok: true,
    };
  },`;

    let apiMethodsExport = `
    create${this.context.entityNameCapitalized},
    update${this.context.entityNameCapitalized},
    getAll${this.context.entityNamePlural},
    get${this.context.entityNameCapitalized},
    delete${this.context.entityNameCapitalized},`;

    let sagaConnections = `
    takeLatest(${this.context.entityNameCapitalized}Types.${this.context.entityNameSnakeCase.toUpperCase()}_REQUEST, ${this.context.entityNameCapitalized}Sagas.get${
        this.context.entityNameCapitalized
    }, api),
    takeLatest(${this.context.entityNameCapitalized}Types.${this.context.entityNameSnakeCase.toUpperCase()}_ALL_REQUEST, ${this.context.entityNameCapitalized}Sagas.getAll${
        this.context.entityNamePlural
    }, api),
    takeLatest(${this.context.entityNameCapitalized}Types.${this.context.entityNameSnakeCase.toUpperCase()}_UPDATE_REQUEST, ${this.context.entityNameCapitalized}Sagas.update${
        this.context.entityNameCapitalized
    }, api),
    takeLatest(${this.context.entityNameCapitalized}Types.${this.context.entityNameSnakeCase.toUpperCase()}_DELETE_REQUEST, ${this.context.entityNameCapitalized}Sagas.delete${
        this.context.entityNameCapitalized
    }, api),`;

    // add searchEngine methods
    if (this.context.searchEngine) {
        console.log(`SearchEngine: ${this.context.searchEngine}`)
        apiMethods += `
  const search${this.context.entityNamePlural} = (query) => api.get('${microservicePath}api/_search/${this.context.entityApiUrl}', { query: query })`;

        fixtureApiMethods += `
  search${this.context.entityNamePlural}: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-${this.context.entityPluralFileName}.json'),
    }
  },`;

        apiMethodsExport += `
    search${this.context.entityNamePlural},`;
        sagaConnections += `
    takeLatest(${this.context.entityNameCapitalized}Types.${this.context.entityNameSnakeCase.toUpperCase()}_SEARCH_REQUEST, ${this.context.entityNameCapitalized}Sagas.search${
            this.context.entityNamePlural
        }, api),`;
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
        insert: `  ${this.context.entityInstancePlural}: require('../../modules/entities/${this.context.entityFileName}/${this.context.entityFileName}.reducer').reducer,`,
    });

    // import saga/redux in sagas/index.js
    this.patchInFile(sagaIndexFilePath, {
        before: 'jhipster-react-native-saga-redux-import-needle',
        insert: `import { ${this.context.entityNameCapitalized}Types } from '../../modules/entities/${this.context.entityFileName}/${this.context.entityFileName}.reducer'`,
    });
    this.patchInFile(sagaIndexFilePath, {
        before: 'jhipster-react-native-saga-method-import-needle',
        insert: `import ${this.context.entityNameCapitalized}Sagas from '../../modules/entities/${this.context.entityFileName}/${this.context.entityFileName}.sagas';`,
    });

    this.patchInFile(sagaIndexFilePath, {
        before: 'jhipster-react-native-saga-redux-connect-needle',
        insert: sagaConnections,
    });
}

module.exports = {
    patchEntityApi,
};
