const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const expectedFiles = require('./expected-files');

// todo maybe deal with https://github.com/jhipster/generator-jhipster/pull/12903/files#diff-6b3a4e19c79c8b302650b8b7466ce6e01e78d0e2f3105d87e9e55b9d6f4cb32d

describe('Subgenerator app', () => {
    describe('Generates app from existing .yo-rc.json', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/app')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/existing-app'), dir);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'react-native',
                    skipChecks: true,
                    debug: true,
                })
                .withGenerators([
                    [
                        require('../generators/app'), // eslint-disable-line global-require
                        'jhipster-react-native:app',
                        path.join(__dirname, '../generators/app/index.js'),
                    ],
                ])
                .on('end', done);
        });

        it('it generates the expected files', () => {
            // Adds your tests here
            assert.file(expectedFiles.defaultApp);
            assert.noFile(expectedFiles.detox);
            assert.noFile(expectedFiles.oauth);
            assert.noFile(expectedFiles.websockets);
        });
    });
    describe('Generates app from prompts', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/app')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/backend/'), `${dir}`);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'react-native',
                    skipChecks: true,
                    debug: true,
                })
                .withGenerators([
                    [
                        require('../generators/app'), // eslint-disable-line global-require
                        'jhipster-react-native:app',
                        path.join(__dirname, '../generators/app/index.js'),
                    ],
                ])
                .withPrompts({
                    detox: true,
                    appName: 'RnApp',
                    directoryPath: '../backend',
                })
                .on('end', done);
        });

        it('it generates the expected files', () => {
            assert.file(expectedFiles.defaultApp);
            assert.file(expectedFiles.detox);
            assert.noFile(expectedFiles.oauth);
            assert.noFile(expectedFiles.websockets);
        });
    });
});
