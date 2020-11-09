/* eslint-disable consistent-return */
const chalk = require('chalk');
const path = require('path');
const AppGenerator = require('generator-jhipster/generators/app');
const { askDetoxPrompt, askNamePrompt, askBackendPrompt } = require('./prompts');
const { writeFiles } = require('./files');
const {
    printJHipsterLogo,
    setupVariables,
    mergeReactNativePackageJson,
    removeYoResolve,
    createEarlyFiles,
    generateReactNativeApp,
    appendGitIgnore,
    patchReactNativeNavigation,
    patchDetox,
    patchWebsockets,
    patchOauth,
} = require('./lib');

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

    get writing() {
        // force overwriting of files since prompting will confuse developers on initial install
        return {
            setUpVariables: setupVariables.bind(this),
            createEarlyFiles,
            generateReactNativeApp: generateReactNativeApp.bind(this),
            mergeRnPackageJson: mergeReactNativePackageJson.bind(this),
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
