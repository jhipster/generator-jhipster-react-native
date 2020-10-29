/* eslint-disable consistent-return */
const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const fs = require('fs-extra');
const { printJHipsterLogo } = require('./lib/print-jhipster-logo');
const { askDetoxPrompt, askNamePrompt, askBackendPrompt } = require('./prompts');
const writeFiles = require('./files').writeFiles;
const packagejs = require('../../package.json');
const { removeYoResolve } = require('./lib/pre-write');
const { createEarlyFiles } = require('./lib/pre-write');
const { generateReactNativeApp } = require('./lib/react-native-init');
const { appendGitIgnore } = require('./lib/append-git-ignore');
const { patchReactNativeNavigation } = require('./lib/patch-react-native-navigation');
const { patchDetox } = require('./lib/patch-detox');
const { patchWebsockets } = require('./lib/patch-websockets');
const { patchOauth } = require('./lib/patch-oauth');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint react-native')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // skips generated annotation from Java files
        this.configOptions.skipGeneratedFlag = true;

        // todo is this possible?
        // this.option('name', {
        //     desc: 'React Native app name',
        //     type: String,
        // });
        // this.option('backend', {
        //     desc: 'JHipster backend',
        //     type: String,
        // });
        // this.option('detox', {
        //     desc: 'JHipster backend',
        //     type: Boolean,
        // });
    }

    get initializing() {
        printJHipsterLogo(this);
        return {};
    }

    get prompting() {
        return {
            askNamePrompt,
            askBackendPrompt,
            askDetoxPrompt,
        };
    }

    get configuring() {
        return {};
    }

    get default() {
        return {};
    }

    _setUpVariables() {
        const configFilePath = `${this.directoryPath}/.yo-rc.json`;
        const jhipsterConfig = fs.readJSONSync(configFilePath);

        this.authType = jhipsterConfig['generator-jhipster'].authenticationType;
        this.websockets = jhipsterConfig['generator-jhipster'].websocket || false;
        this.searchEngine = jhipsterConfig['generator-jhipster'].searchEngine || false;
        this.applicationType = jhipsterConfig['generator-jhipster'].applicationType;
        this.uaaBaseName = this.authType === 'uaa' ? jhipsterConfig['generator-jhipster'].uaaBaseName.toLowerCase() : '';
        this.useNpm = true;
        this.skipCommitHook = false;
        this.packageVersion = packagejs.version;
        this.androidPackageName = this.reactNativeAppName.toLowerCase();
        // used for JHipster templates
        this.packageFolder = jhipsterConfig['generator-jhipster'].packageFolder;

        this.config.set({
            reactNativeAppName: this.reactNativeAppName,
            authType: this.authType,
            websockets: this.websockets,
            searchEngine: this.searchEngine,
            applicationType: this.applicationType,
            detox: this.detox,
            useNpm: this.useNpm,
            backend: this.directoryPath,
            uaaBaseName: this.uaaBaseName,
        });
    }

    get writing() {
        // force overwriting of files since prompting will confuse developers on initial install
        return {
            setUpVariables: this._setUpVariables,
            createEarlyFiles,
            generateReactNativeApp: generateReactNativeApp.bind(this),
            writeFiles: writeFiles.bind(this),
            patchOauth: patchOauth.bind(this),
            patchDetox: patchDetox.bind(this),
            patchWebsockets: patchWebsockets.bind(this),
            patchReactNativeNavigation: patchReactNativeNavigation.bind(this),
            appendGitIgnore: appendGitIgnore.bind(this),
            removeYoResolve,
        };
    }

    get install() {
        // remove condition after JHipster v7
        const gitInit = super._install().initGitRepo ? super._install().initGitRepo.bind(this) : super._writing().initGitRepo.bind(this);
        return {
            npmInstall() {
                // todo
            },
            podInstall() {
                // todo
            },
            gitInit,
        };
    }

    get end() {
        const gitCommit = super._end().gitCommit.bind(this);
        return {
            gitCommit,
        };
    }
};
