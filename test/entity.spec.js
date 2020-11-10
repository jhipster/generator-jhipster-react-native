const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const expectedFiles = require('./expected-files');

describe('Subgenerator entity', () => {
    describe('Generates entity from existing JSON config file', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/backend'), `${dir}/`);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'react-native',
                    skipChecks: true,
                })
                .withGenerators([
                    [
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-react-native:entity',
                        path.join(__dirname, '../generators/entity/index.js'),
                    ],
                ])
                .withArguments(['foo'])
                .on('end', done);
        });

        it('it generates the expected files', () => {
            assert.file(expectedFiles.entity);
            assert.noFile(expectedFiles.entityDetox);
            assert.noFile(expectedFiles.entitySearchEngine);
        });
    });
    describe('Generates entity from prompt of backend path', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/backend'), `${dir}/../backend`);
                    fse.copySync(path.join(__dirname, '../test/templates/existing-app/.yo-rc.json'), `${dir}/.yo-rc.json`);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'react-native',
                    skipChecks: true,
                })
                .withGenerators([
                    [
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-react-native:entity',
                        path.join(__dirname, '../generators/entity/index.js'),
                    ],
                ])
                .withArguments(['foo'])
                .withPrompts({
                    backendPath: '../backend',
                })
                .on('end', done);
        });

        it('it generates the expected files', () => {
            assert.file(expectedFiles.entity);
            assert.noFile(expectedFiles.entityDetox);
            assert.noFile(expectedFiles.entitySearchEngine);
        });
    });
    describe('Generates entity from prompt of backend path, with detox files', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/backend'), `${dir}/../backend`);
                    fse.copySync(path.join(__dirname, '../test/templates/existing-app-detox/.yo-rc.json'), `${dir}/.yo-rc.json`);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'react-native',
                    skipChecks: true,
                })
                .withGenerators([
                    [
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-react-native:entity',
                        path.join(__dirname, '../generators/entity/index.js'),
                    ],
                ])
                .withArguments(['foo'])
                .withPrompts({
                    backendPath: '../backend',
                })
                .on('end', done);
        });

        it('it generates the expected files', () => {
            assert.file(expectedFiles.entity);
            assert.file(expectedFiles.entityDetox);
            assert.noFile(expectedFiles.entitySearchEngine);
        });
    });
    describe('Generates entity from prompt of backend path, with search files', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/entity')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/backend'), `${dir}/../backend`);
                    fse.copySync(path.join(__dirname, '../test/templates/existing-app-elasticsearch/.yo-rc.json'), `${dir}/.yo-rc.json`);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'react-native',
                    skipChecks: true,
                })
                .withGenerators([
                    [
                        require('../generators/entity'), // eslint-disable-line global-require
                        'jhipster-react-native:entity',
                        path.join(__dirname, '../generators/entity/index.js'),
                    ],
                ])
                .withArguments(['foo'])
                .withPrompts({
                    backendPath: '../backend',
                })
                .on('end', done);
        });

        it('it generates the expected files', () => {
            assert.file(expectedFiles.entity);
            assert.noFile(expectedFiles.entityDetox);
            assert.file(expectedFiles.entitySearchEngine);
        });
    });
});
