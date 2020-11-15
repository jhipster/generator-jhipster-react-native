function patchApi() {
    const apiFilePath = 'app/shared/services/api.js';
    const fixtureApiFilePath = 'app/shared/services/fixture-api.js';
    const reduxIndexFilePath = 'app/shared/reducers/index.js';
    const sagaIndexFilePath = 'app/shared/sagas/index.js';

    // REDUX AND SAGA SECTION
    let apiMethods = `
  const get${this.name} = (${this.camelCaseName}Id) => api.get('${this.microservicePath}api/${this.kebabCaseNamePlural}/' + ${this.camelCaseName}Id)
  const get${this.pluralName} = (options) => api.get('${this.microservicePath}api/${this.kebabCaseNamePlural}', options)
  const create${this.name} = (${this.camelCaseName}) => api.post('${this.microservicePath}api/${this.kebabCaseNamePlural}', ${this.camelCaseName})
  const update${this.name} = (${this.camelCaseName}) => api.put('${this.microservicePath}api/${this.kebabCaseNamePlural}', ${this.camelCaseName})
  const delete${this.name} = (${this.camelCaseName}Id) => api.delete('${this.microservicePath}api/${this.kebabCaseNamePlural}/' + ${this.camelCaseName}Id)`;

    let fixtureApiMethods = `  update${this.name}: (${this.camelCaseName}) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-${this.kebabCaseName}.json'),
    }
  },
  get${this.pluralName}: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-${this.kebabCaseNamePlural}.json'),
    }
  },
  get${this.name}: (${this.camelCaseName}Id) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-${this.kebabCaseName}.json'),
    }
  },
  delete${this.name}: (${this.camelCaseName}Id) => {
    return {
      ok: true,
    }
  },`;

    let apiMethodsExport = `
    create${this.name},
    update${this.name},
    get${this.pluralName},
    get${this.name},
    delete${this.name},`;

    let sagaConnections = `
    takeLatest(${this.name}Types.${this.snakeCaseName.toUpperCase()}_REQUEST, get${this.name}, api),
    takeLatest(${this.name}Types.${this.snakeCaseName.toUpperCase()}_ALL_REQUEST, get${this.pluralName}, api),
    takeLatest(${this.name}Types.${this.snakeCaseName.toUpperCase()}_UPDATE_REQUEST, update${this.name}, api),
    takeLatest(${this.name}Types.${this.snakeCaseName.toUpperCase()}_DELETE_REQUEST, delete${this.name}, api),`;

    // add searchEngine methods
    if (this.searchEngine) {
        apiMethods += `
  const search${this.pluralName} = (query) => api.get('${this.microservicePath}api/_search/${this.kebabCaseNamePlural}', { query: query })`;

        fixtureApiMethods += `
  search${this.pluralName}: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-${this.pluralName.toLowerCase()}.json')
    }
  },`;

        apiMethodsExport += `
    search${this.pluralName},`;
        sagaConnections += `
    takeLatest(${this.name}Types.${this.snakeCaseName.toUpperCase()}_SEARCH_REQUEST, search${this.pluralName}, api),`;
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
        insert: `  ${this.camelCaseNamePlural}: require('../../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}.reducer').reducer,`,
    });

    // import saga/redux in sagas/index.js
    this.patchInFile(sagaIndexFilePath, {
        before: 'jhipster-react-native-saga-redux-import-needle',
        insert: `import { ${this.name}Types } from '../../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}.reducer'`,
    });
    this.patchInFile(sagaIndexFilePath, {
        before: 'jhipster-react-native-saga-method-import-needle',
        insert: `import { get${this.name}, get${this.pluralName}, update${this.name}, delete${this.name}${
            this.searchEngine ? `, search${this.pluralName}` : ''
        } } from '../../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}.sagas'`,
    });

    this.patchInFile(sagaIndexFilePath, {
        before: 'jhipster-react-native-saga-redux-connect-needle',
        insert: sagaConnections,
    });
}

module.exports = {
    patchApi,
};
