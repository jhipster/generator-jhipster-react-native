/* eslint-disable consistent-return */
const chalk = require('chalk');
const path = require('path');
const AppGenerator = require('generator-jhipster/generators/app');
const { askDetoxPrompt, askNamePrompt, askBackendPrompt } = require('./prompts');
const { writeFiles } = require('./files');
const {
    printJHipsterLogo,
    loadVariables,
    setupVariables,
    mergeReactNativePackageJson,
    createEarlyFiles,
    generateReactNativeApp,
    appendFiles,
    patchReactNativeNavigation,
    patchDetox,
    patchWebsockets,
    patchOauth,
    patchInFile,
    patchUriScheme,
} = require('../../lib');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint react-native')}`);
        }

        this.patchInFile = patchInFile.bind(this);
        if (!this.context) {
            this.context = {}
        }
    }

    get initializing() {
        printJHipsterLogo(this);
        return {
            loadVariables: loadVariables.bind(this),
        };
    }

    get prompting() {
        return {
            askNamePrompt,
            askBackendPrompt: askBackendPrompt.bind(this),
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
            patchUriScheme: patchUriScheme.bind(this),
            patchOauth: patchOauth.bind(this),
            patchDetox: patchDetox.bind(this),
            patchWebsockets: patchWebsockets.bind(this),
            patchReactNativeNavigation: patchReactNativeNavigation.bind(this),
            appendFiles: appendFiles.bind(this),
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
            gitInit,
            npmInstall() {
                if (!this.options.skipInstall) {
                    this.spawnCommandSync('npm', ['i']);
                }
            },
            prettier() {
                this.info('Running prettier...');
                this.spawnCommandSync('npx', ['prettier', '--write', '{,.,**/,.jhipster/**/}*.{md,json,yml,js,ts,tsx}'], {
                    stdio: 'ignore',
                });
            },
        };
    }

    get end() {
        const gitCommit = super._end().gitCommit.bind(this);
        return {
            gitCommit,
        };
    }
};
