/* eslint-disable consistent-return */
const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const fs = require('fs-extra');
const { printJHipsterLogo } = require('./lib/print-jhipster-logo');
const { askDetoxPrompt, askNamePrompt, askBackendPrompt } = require('./prompts');
const { writeFiles } = require('./files');
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
        let jhipsterConfig;
        if (this.options.fromJdl) {
            console.log('App from JDL');
            jhipsterConfig = this.config.getAll();
            // todo defaults for this?
            this.reactNativeAppName = this._.upperFirst(this._.camelCase(jhipsterConfig.baseName))
            this.detox = true;
        } else {
            const configFilePath = `${this.directoryPath}/.yo-rc.json`;
            jhipsterConfig = fs.readJSONSync(configFilePath)['generator-jhipster'];
        }

        this.authType = jhipsterConfig.authenticationType;
        this.websocket = jhipsterConfig.websocket || false;
        this.searchEngine = jhipsterConfig.searchEngine || false;
        this.applicationType = jhipsterConfig.applicationType;
        this.uaaBaseName = this.authType === 'uaa' ? jhipsterConfig.uaaBaseName.toLowerCase() : '';
        this.useNpm = true;
        this.skipCommitHook = false;
        this.packageVersion = packagejs.version;
        this.androidPackageName = this.reactNativeAppName.toLowerCase();
        // used for JHipster templates
        this.packageFolder = jhipsterConfig.packageFolder;

        this.config.set({
            reactNative: {
                reactNativeAppName: this.reactNativeAppName,
                detox: this.detox,
                useNpm: this.useNpm,
                backend: this.directoryPath,
                version: this.packageVersion,
            },
            ...jhipsterConfig,
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
