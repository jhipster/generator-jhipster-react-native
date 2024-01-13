function patchNavigationForEntity(name) {
  const entityScreenFilePath = 'app/modules/entities/entities-screen.js';
  const entityStackPath = 'app/navigation/entity-stack.js';

  // import entity screens to navigation
  const navigationImport = `import ${this.context.entityNameCapitalized}Screen from '../modules/entities/${this.context.entityFileName}/${this.context.entityFileName}-screen'`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-import-needle',
    insert: navigationImport,
  });
  const navigationImportDetail = `import ${this.context.entityNameCapitalized}DetailScreen from '../modules/entities/${this.context.entityFileName}/${this.context.entityFileName}-detail-screen'`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-import-needle',
    insert: navigationImportDetail,
  });
  const navigationImportEdit = `import ${this.context.entityNameCapitalized}EditScreen from '../modules/entities/${this.context.entityFileName}/${this.context.entityFileName}-edit-screen'`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-import-needle',
    insert: navigationImportEdit,
  });

  // import entity screens to navigation
  const navigationDeclaration = `{ name: '${this.context.entityNameCapitalized}', route: '${this.context.entityFileName}', component: ${this.context.entityNameCapitalized}Screen, options: { title: '${this.context.entityNamePlural}', headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />, headerRight: () => <HeaderBackButton label=" New " onPress={() => navigate('${this.context.entityNameCapitalized}Edit', { id: undefined })} backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />} /> },},`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-declaration-needle',
    insert: navigationDeclaration,
    ignoreIfContains: `{ name: '${this.context.entityNameCapitalized}', route: '${this.context.entityFileName}'`,
  });
  const navigationDeclarationDetail = `{ name: '${this.context.entityNameCapitalized}Detail', route: '${this.context.entityFileName}/detail', component: ${this.context.entityNameCapitalized}DetailScreen, options: { title: 'View ${this.context.entityNameCapitalized}', headerLeft: () => <HeaderBackButton onPress={() => navigate('${this.context.entityNameCapitalized}')} /> },},`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-declaration-needle',
    insert: navigationDeclarationDetail,
    ignoreIfContains: `{ name: '${this.context.entityNameCapitalized}Detail', route: '${this.context.entityFileName}/detail'`,
  });
  const navigationDeclarationEdit = `{ name: '${this.context.entityNameCapitalized}Edit', route: '${this.context.entityFileName}/edit', component: ${this.context.entityNameCapitalized}EditScreen, options: { title: 'Edit ${this.context.entityNameCapitalized}', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('${this.context.entityNameCapitalized}Detail', '${this.context.entityNameCapitalized}')} /> },},`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-declaration-needle',
    insert: navigationDeclarationEdit,
    ignoreIfContains: `{ name: '${this.context.entityNameCapitalized}Edit', route: '${this.context.entityFileName}/edit'`,
  });

  // add entity to entities screen
  const entityScreenButton = `        <RoundedButton text="${this.context.entityNameCapitalized}" onPress={() => navigation.navigate('${this.context.entityNameCapitalized}')} testID="${this.context.entityInstance}EntityScreenButton" />`;
  this.patchInFile(entityScreenFilePath, {
    before: 'jhipster-react-native-entity-screen-needle',
    insert: entityScreenButton,
    ignoreIfContains: `<RoundedButton text="${this.context.entityNameCapitalized}"`,
  });
}

export {
  patchNavigationForEntity,
};
