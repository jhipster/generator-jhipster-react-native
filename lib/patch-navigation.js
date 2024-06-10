function patchNavigationForEntity(entity) {
  const entityScreenFilePath = 'app/modules/entities/entities-screen.js';
  const entityStackPath = 'app/navigation/entity-stack.js';

  // import entity screens to navigation
  const navigationImport = `import ${entity.entityNameCapitalized}Screen from '../modules/entities/${entity.entityFileName}/${entity.entityFileName}-screen'`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-import-needle',
    insert: navigationImport,
  });
  const navigationImportDetail = `import ${entity.entityNameCapitalized}DetailScreen from '../modules/entities/${entity.entityFileName}/${entity.entityFileName}-detail-screen'`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-import-needle',
    insert: navigationImportDetail,
  });
  const navigationImportEdit = `import ${entity.entityNameCapitalized}EditScreen from '../modules/entities/${entity.entityFileName}/${entity.entityFileName}-edit-screen'`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-import-needle',
    insert: navigationImportEdit,
  });

  // import entity screens to navigation
  const navigationDeclaration = `{ name: '${entity.entityNameCapitalized}', route: '${entity.entityFileName}', component: ${entity.entityNameCapitalized}Screen, options: { title: '${entity.entityNamePlural}', headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />, headerRight: () => <HeaderBackButton label=" New " onPress={() => navigate('${entity.entityNameCapitalized}Edit', { id: undefined })} backImage={(props) => <Ionicons name="add-circle-outline" size={32} color={props.tintColor} />} /> },},`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-declaration-needle',
    insert: navigationDeclaration,
    ignoreIfContains: `{ name: '${entity.entityNameCapitalized}', route: '${entity.entityFileName}'`,
  });
  const navigationDeclarationDetail = `{ name: '${entity.entityNameCapitalized}Detail', route: '${entity.entityFileName}/detail', component: ${entity.entityNameCapitalized}DetailScreen, options: { title: 'View ${entity.entityNameCapitalized}', headerLeft: () => <HeaderBackButton onPress={() => navigate('${entity.entityNameCapitalized}')} /> },},`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-declaration-needle',
    insert: navigationDeclarationDetail,
    ignoreIfContains: `{ name: '${entity.entityNameCapitalized}Detail', route: '${entity.entityFileName}/detail'`,
  });
  const navigationDeclarationEdit = `{ name: '${entity.entityNameCapitalized}Edit', route: '${entity.entityFileName}/edit', component: ${entity.entityNameCapitalized}EditScreen, options: { title: 'Edit ${entity.entityNameCapitalized}', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('${entity.entityNameCapitalized}Detail', '${entity.entityNameCapitalized}')} /> },},`;
  this.patchInFile(entityStackPath, {
    before: 'jhipster-react-native-navigation-declaration-needle',
    insert: navigationDeclarationEdit,
    ignoreIfContains: `{ name: '${entity.entityNameCapitalized}Edit', route: '${entity.entityFileName}/edit'`,
  });

  // add entity to entities screen
  const entityScreenButton = `        <RoundedButton text="${entity.entityNameCapitalized}" onPress={() => navigation.navigate('${entity.entityNameCapitalized}')} testID="${entity.entityInstance}EntityScreenButton" />`;
  this.patchInFile(entityScreenFilePath, {
    before: 'jhipster-react-native-entity-screen-needle',
    insert: entityScreenButton,
    ignoreIfContains: `<RoundedButton text="${entity.entityNameCapitalized}"`,
  });
}

export { patchNavigationForEntity };
