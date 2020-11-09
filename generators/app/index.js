/* eslint-disable consistent-return */
const chalk = require('chalk');
const path = require('path');
const AppGenerator = require('generator-jhipster/generators/app');
const utils = require('generator-jhipster/generators/utils');
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
            this.reactNativeAppName = this._.upperFirst(this._.camelCase(jhipsterConfig.baseName));
            this.detox = true;
        } else {
            const configFilePath = `${this.directoryPath}/.yo-rc.json`;
            jhipsterConfig = this.fs.readJSON(configFilePath)['generator-jhipster'];
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
            mergeRnPackageJson() {
                const done = this.async();
                // get react-native generated package.json
                const rnPackageJson = this.fs.readJSON('package.json');
                // get templated package.json
                const _this = this;
                utils.renderContent('package.json.ejs', _this, _this, {}, templatedPackageJsonAsString => {
                    const mergedPackageJson = JSON.parse(templatedPackageJsonAsString);
                    // todo merge the two and save
                    const keys = ['scripts', 'dependencies', 'devDependencies'];
                    // loop through the keys
                    keys.forEach(packageJsonSectionKey => {
                        // get the section of the package.json from the react-native package
                        const packageJsonSection = rnPackageJson[packageJsonSectionKey];
                        this.debug(`Updating package.json section: ${packageJsonSectionKey}`);
                        // loop through the keys in the package.json section
                        Object.keys(packageJsonSection).forEach(key => {
                            this.debug(`Checking for: ${packageJsonSectionKey}.${key}`);
                            // if the templated package.json does not have the key, add it to the merged package.json
                            // if the templated package.json has the key, it means we overwrote that section in the template
                            if (!Object.prototype.hasOwnProperty.call(mergedPackageJson[packageJsonSectionKey], key)) {
                                this.debug(`Adding ${key}: ${packageJsonSection[key]} to ${packageJsonSectionKey} from RN package.json`);
                                mergedPackageJson[packageJsonSectionKey][key] = packageJsonSection[key];
                            }
                        });
                    });

                    this.fs.writeJSON('package.json', mergedPackageJson);
                    this.debug("package.json merged with React Native's package.json");
                    done();
                });
            },
            writeFiles: writeFiles.bind(this),
            patchOauth: patchOauth.bind(this),
            patchDetox: patchDetox.bind(this),
            patchWebsockets: patchWebsockets.bind(this),
            patchReactNativeNavigation: patchReactNativeNavigation.bind(this),
            appendGitIgnore: appendGitIgnore.bind(this),
            replacePackageJsonVersions() {
                this.debug('Replacing Package.json Versions');
                this.replacePackageJsonVersions('REPLACE_WITH_VERSION', path.join(__dirname, 'templates/package.json'));
            },
            composeEntities() {
                if (!this.withEntities) return;
                this.composeWithJHipster('entities', { skipInstall: true }, true);
            },
        };
    }

    get install() {
        // remove condition after JHipster v7
        const gitInit = super._install().initGitRepo ? super._install().initGitRepo.bind(this) : super._writing().initGitRepo.bind(this);
        return {
            removeYoResolve,
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
