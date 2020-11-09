const files = {
    common: [
        {
            templates: [
                {
                    file: 'entity-detail-screen.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}-entity-detail-screen.js`,
                },
                {
                    file: 'entity-detail-screen-style.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}-entity-detail-screen-style.js`,
                },
                {
                    file: 'entity-edit-screen.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}-entity-edit-screen.js`,
                },
                {
                    file: 'entity-edit-screen-style.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}-entity-edit-screen-style.js`,
                },
                {
                    file: 'entity-flatlist.js',
                    renameTo: generator => `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}-entity-screen.js`,
                },
                {
                    file: 'entity-flatlist-style.js',
                    renameTo: generator =>
                        `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}-entity-screen-style.js`,
                },
                {
                    file: 'entity-reducer.js',
                    renameTo: generator => `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}.reducer.js`,
                },
                {
                    file: 'entity-reducer.spec.js',
                    renameTo: generator =>
                        `test/spec/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}.reducer.spec.js`,
                },
                {
                    file: 'entity-sagas.js',
                    renameTo: generator => `app/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}.sagas.js`,
                },
                {
                    file: 'entity-sagas.spec.js',
                    renameTo: generator => `test/spec/modules/entities/${generator.kebabCaseName}/${generator.kebabCaseName}.sagas.spec.js`,
                },
            ],
        },
    ],
    fixtures: [
        {
            templates: [
                { file: 'fixtures/entity-get.json', renameTo: generator => `app/shared/fixtures/get-${generator.name.toLowerCase()}.json` },
                {
                    file: 'fixtures/entity-get-all.json',
                    renameTo: generator => `app/shared/fixtures/get-${generator.pluralName.toLowerCase()}.json`,
                },
                {
                    file: 'fixtures/entity-update.json',
                    renameTo: generator => `app/shared/fixtures/update-${generator.name.toLowerCase()}.json`,
                },
            ],
        },
        {
            condition: generator => generator.searchEngine,
            templates: [
                {
                    file: 'fixtures/entity-get-all.json',
                    renameTo: generator => `app/shared/fixtures/search-${generator.pluralName.toLowerCase()}.json`,
                },
            ],
        },
    ],
    detox: [
        {
            condition: generator => generator.detox,
            templates: [{ file: 'entity-e2e-test.js', renameTo: generator => `e2e/entities/${generator.kebabCaseName}.spec.js` }],
        },
    ],
};

module.exports = { files, writeFiles };

function writeFiles() {
    this.writeFilesToDisk(files, this);
}
