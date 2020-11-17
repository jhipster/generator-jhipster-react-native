function patchNavigation(name) {
    const upperSnakeCaseName = this._.upperCase(this._.snakeCase(`${name}EntityScreen`)).replace(/ /g, '_');
    const upperSnakeCaseNameEdit = this._.upperCase(this._.snakeCase(`${name}EntityEditScreen`)).replace(/ /g, '_');
    const upperSnakeCaseNameDetail = this._.upperCase(this._.snakeCase(`${name}EntityDetailScreen`)).replace(/ /g, '_');

    const entityScreenFilePath = 'app/modules/entities/entities-screen.js';
    const navigationRouterFilePath = 'app/navigation/layouts.js';

    // import entity screens to navigation
    const navigationImport = `import ${name}EntityScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-screen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImport,
    });
    const navigationImportDetail = `import ${name}EntityDetailScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-detail-screen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImportDetail,
    });
    const navigationImportEdit = `import ${name}EntityEditScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-edit-screen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImportEdit,
    });

    // import entity screens to navigation
    const navigationDeclaration = `export const ${upperSnakeCaseName} = 'nav.${name}EntityScreen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclaration,
    });
    const navigationDeclarationDetail = `export const ${upperSnakeCaseNameDetail} = 'nav.${name}EntityDetailScreen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclarationDetail,
    });
    const navigationDeclarationEdit = `export const ${upperSnakeCaseNameEdit} = 'nav.${name}EntityEditScreen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclarationEdit,
    });

    const getNavCase = (SCREEN_NAME, component) => `registerComponentWithRedux(${SCREEN_NAME}, ${component})`;
    // add entity screens to navigation
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-registration-needle',
        insert: getNavCase(upperSnakeCaseName, `${name}EntityScreen`),
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-registration-needle',
        insert: getNavCase(upperSnakeCaseNameDetail, `${name}EntityDetailScreen`),
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-registration-needle',
        insert: getNavCase(upperSnakeCaseNameEdit, `${name}EntityEditScreen`),
    });

    const navigationMethodMain = `
export const ${this.camelCaseName}EntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: ${upperSnakeCaseName},
      options: {
        topBar: {
          title: {
            text: '${this.pluralName}',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: '${this.camelCaseName}CreateButton',
            },
          ],
        },
      },
    },
  })`;

    const navigationMethodDetail = `
export const ${this.camelCaseName}EntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ${upperSnakeCaseNameDetail},
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: '${this.pluralName}',
            color: Colors.snow,
          },
        },
      },
    },
  })`;
    const navigationMethodEdit = `
export const ${this.camelCaseName}EntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ${upperSnakeCaseNameEdit},
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: '${this.pluralName}',
            color: Colors.snow,
          },
        },
      },
    },
  })`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-method-needle',
        insert: navigationMethodMain,
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-method-needle',
        insert: navigationMethodEdit,
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-method-needle',
        insert: navigationMethodDetail,
    });
    // add entity to entities screen
    const entityScreenButton = `        <RoundedButton text="${name}" onPress={${this.camelCaseName}EntityScreen} testID="${this.camelCaseName}EntityScreenButton" />`;
    this.patchInFile(entityScreenFilePath, {
        before: 'jhipster-react-native-entity-screen-needle',
        insert: entityScreenButton,
    });
    const entityScreenImport = `  ${this.camelCaseName}EntityScreen,`;
    this.patchInFile(entityScreenFilePath, {
        before: 'jhipster-react-native-entity-screen-import-needle',
        insert: entityScreenImport,
    });
}

module.exports = {
    patchNavigation,
};
