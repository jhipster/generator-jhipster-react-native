import { clientRootTemplatesBlock } from 'generator-jhipster/generators/client/support';

const files = {
  common: [
    clientRootTemplatesBlock({
      templates: [
        'app/modules/entities/_entityFolder_/_entityFile_-delete-modal.js',
        'app/modules/entities/_entityFolder_/_entityFile_-detail-screen.js',
        'app/modules/entities/_entityFolder_/_entityFile_-edit-screen.js',
        'app/modules/entities/_entityFolder_/_entityFile_-screen.js',
        'app/modules/entities/_entityFolder_/_entityFile_-styles.js',
        'app/modules/entities/_entityFolder_/_entityFile_.reducer.js',
        'test/spec/modules/entities/_entityFolder_/_entityFile_.reducer.spec.js',
        'app/modules/entities/_entityFolder_/_entityFile_.sagas.js',
        'test/spec/modules/entities/_entityFolder_/_entityFile_.sagas.spec.js',
      ],
    }),
  ],
  fixtures: [
    clientRootTemplatesBlock({
      templates: [
        'app/shared/fixtures/get-_entityFile_.json',
        {
          file: 'app/shared/fixtures/entity-get-all.json',
          // Workaround for entityPluralFileName 'xxxundefined' due to angularSuffix == undefined
          renameTo: generator => `app/shared/fixtures/get-all-${generator.entityNamePluralizedAndSpinalCased}.json`,
        },
        'app/shared/fixtures/update-_entityFile_.json',
      ],
    }),
    clientRootTemplatesBlock({
      condition: generator => generator.searchEngineAny,
      templates: [
        {
          file: 'app/shared/fixtures/entity-get-all.json',
          // Workaround for entityPluralFileName 'xxxundefined' due to angularSuffix == undefined
          renameTo: generator => `app/shared/fixtures/search-${generator.entityNamePluralizedAndSpinalCased}.json`,
        },
      ],
    }),
  ],
  detox: [
    clientRootTemplatesBlock({
      condition: ctx => ctx.detox,
      templates: ['e2e/entities/_entityFile_.spec.js'],
    }),
  ],
};

export default files;
