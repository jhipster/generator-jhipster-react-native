const files = {
  common: [
    {
      templates: [
        {
          file: 'app/modules/entities/entity-delete-modal.js',
          renameTo: generator =>
            `app/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}-delete-modal.js`,
        },
        {
          file: 'app/modules/entities/entity-detail-screen.js',
          renameTo: generator =>
            `app/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}-detail-screen.js`,
        },
        {
          file: 'app/modules/entities/entity-edit-screen.js',
          renameTo: generator =>
            `app/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}-edit-screen.js`,
        },
        {
          file: 'app/modules/entities/entity-flatlist.js',
          renameTo: generator => `app/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}-screen.js`,
        },
        {
          file: 'app/modules/entities/entity-styles.js',
          renameTo: generator => `app/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}-styles.js`,
        },
        {
          file: 'app/modules/entities/entity-reducer.js',
          renameTo: generator => `app/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}.reducer.js`,
        },
        {
          file: 'app/modules/entities/entity-reducer.spec.js',
          renameTo: generator =>
            `test/spec/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}.reducer.spec.js`,
        },
        {
          file: 'app/modules/entities/entity-sagas.js',
          renameTo: generator => `app/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}.sagas.js`,
        },
        {
          file: 'app/modules/entities/entity-sagas.spec.js',
          renameTo: generator =>
            `test/spec/modules/entities/${generator.entity.entityFileName}/${generator.entity.entityFileName}.sagas.spec.js`,
        },
      ],
    },
  ],
  fixtures: [
    {
      templates: [
        {
          file: 'app/modules/entities/fixtures/entity-get.json',
          renameTo: generator => `app/shared/fixtures/get-${generator.entity.entityFileName}.json`,
        },
        {
          file: 'app/modules/entities/fixtures/entity-get-all.json',
          // Workaround for entityPluralFileName 'xxxundefined' due to angularSuffix == undefined
          renameTo: generator => `app/shared/fixtures/get-all-${generator.entity.entityNamePluralizedAndSpinalCased}.json`,
        },
        {
          file: 'app/modules/entities/fixtures/entity-update.json',
          renameTo: generator => `app/shared/fixtures/update-${generator.entity.entityFileName}.json`,
        },
      ],
    },
    {
      condition: generator => generator.entity.searchEngineAny,
      templates: [
        {
          file: 'app/modules/entities/fixtures/entity-get-all.json',
          // Workaround for entityPluralFileName 'xxxundefined' due to angularSuffix == undefined
          renameTo: generator => `app/shared/fixtures/search-${generator.entity.entityNamePluralizedAndSpinalCased}.json`,
        },
      ],
    },
  ],
  detox: [
    {
      condition: generator => generator.reactNativeConfig.detox,
      templates: [
        {
          file: 'app/modules/entities/entity-e2e-test.js',
          renameTo: generator => `e2e/entities/${generator.entity.entityFileName}.spec.js`,
        },
      ],
    },
  ],
};

export default files;
