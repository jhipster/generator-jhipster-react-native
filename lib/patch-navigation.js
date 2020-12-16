function patchNavigation() {}

function patchNavigationForEntity(name) {
    const entityScreenFilePath = 'app/modules/entities/entities-screen.js';
    const entityStackPath = 'app/navigation/entity-stack.js';

    // import entity screens to navigation
    const navigationImport = `import ${name}EntityScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-screen'`;
    this.patchInFile(entityStackPath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImport,
    });
    const navigationImportDetail = `import ${name}EntityDetailScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-detail-screen'`;
    this.patchInFile(entityStackPath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImportDetail,
    });
    const navigationImportEdit = `import ${name}EntityEditScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-edit-screen'`;
    this.patchInFile(entityStackPath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImportEdit,
    });

    // import entity screens to navigation
    const navigationDeclaration = `{ name: '${name}Entity', route: '${this.kebabCaseName}', component: ${name}EntityScreen, options: { title: '${this.pluralName}', headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />, headerRight: () => <HeaderBackButton label=' New ' onPress={() => navigate('${name}EntityEdit')} backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />} /> }},`;
    this.patchInFile(entityStackPath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclaration,
    });
    const navigationDeclarationDetail = `{ name: '${name}EntityDetail', route: '${this.kebabCaseName}/detail', component: ${name}EntityDetailScreen, options: { title: 'View ${this.name}', headerLeft: () => <HeaderBackButton onPress={() => navigate('${name}Entity')} /> }},`;
    this.patchInFile(entityStackPath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclarationDetail,
    });
    const navigationDeclarationEdit = `{ name: '${name}EntityEdit', route: '${this.kebabCaseName}/edit', component: ${name}EntityEditScreen, options: { title: 'Edit ${this.name}', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('${name}EntityDetail')} /> }},`;
    this.patchInFile(entityStackPath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclarationEdit,
    });

    // add entity to entities screen
    const entityScreenButton = `        <RoundedButton text="${name}" onPress={() => this.props.navigation.navigate('${name}Entity')} testID="${this.camelCaseName}EntityScreenButton" />`;
    this.patchInFile(entityScreenFilePath, {
        before: 'jhipster-react-native-entity-screen-needle',
        insert: entityScreenButton,
    });
}

module.exports = {
    patchReactNativeNavigation: patchNavigation,
    patchNavigationForEntity,
};
