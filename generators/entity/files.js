const files = {
    common: [
        {
            templates: [
                {
                    file: 'entity-delete-modal.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}-entity-delete-modal.js`,
                },
                {
                    file: 'entity-detail-screen.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}-entity-detail-screen.js`,
                },
                {
                    file: 'entity-detail-screen-style.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}-entity-detail-screen-style.js`,
                },
                {
                    file: 'entity-edit-screen.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}-entity-edit-screen.js`,
                },
                {
                    file: 'entity-edit-screen-style.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}-entity-edit-screen-style.js`,
                },
                {
                    file: 'entity-flatlist.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}-entity-screen.js`,
                },
                {
                    file: 'entity-flatlist-style.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}-entity-screen-style.js`,
                },
                {
                    file: 'entity-reducer.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}.reducer.js`,
                },
                {
                    file: 'entity-reducer.spec.js',
                    renameTo: generator =>
                        `test/spec/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}.reducer.spec.js`,
                },
                {
                    file: 'entity-sagas.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}.sagas.js`,
                },
                {
                    file: 'entity-sagas.spec.js',
                    renameTo: generator =>
                        `test/spec/modules/entities/${generator.context.entityFileName}/${generator.context.entityFileName}.sagas.spec.js`,
                },
            ],
        },
    ],
    fixtures: [
        {
            templates: [
                {
                    file: 'fixtures/entity-get.json',
                    renameTo: generator => `app/shared/fixtures/get-${generator.context.entityFileName}.json`,
                },
                {
                    file: 'fixtures/entity-get-all.json',
                    renameTo: generator => `app/shared/fixtures/get-all-${generator.context.entityPluralFileName}.json`,
                },
                {
                    file: 'fixtures/entity-update.json',
                    renameTo: generator => `app/shared/fixtures/update-${generator.context.entityFileName}.json`,
                },
            ],
        },
        {
            condition: generator => generator.context.searchEngine,
            templates: [
                {
                    file: 'fixtures/entity-get-all.json',
                    renameTo: generator => `app/shared/fixtures/search-${generator.context.entityPluralFileName}.json`,
                },
            ],
        },
    ],
    detox: [
        {
            condition: generator => generator.context.detox,
            templates: [{ file: 'entity-e2e-test.js', renameTo: generator => `e2e/entities/${generator.context.entityFileName}.spec.js` }],
        },
    ],
};

module.exports = { files, writeFiles };

function writeFiles() {
    this.writeFilesToDisk(files, this);
}
