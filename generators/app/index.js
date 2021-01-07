/* eslint-disable consistent-return */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
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
            this.context = {};
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

    get loading() {
        return super._loading();
    }

    get writing() {
        // force overwriting of files since prompting will confuse developers on initial install
        return {
            setUpVariables: setupVariables.bind(this),
            setUpTemplateVariables() {
                this.context.reactNativeAppNameKebabCase = this._.kebabCase(this.context.reactNativeAppName);
                if (
                    this.context.authenticationType === 'oauth2' ||
                    (this.context.databaseType === 'no' && this.context.authenticationType !== 'uaa')
                ) {
                    this.context.skipUserManagement = true;
                }
            },
            createEarlyFiles,
            generateReactNativeApp: generateReactNativeApp.bind(this),
            mergeRnPackageJson: mergeReactNativePackageJson.bind(this),
            writeFiles: writeFiles.bind(this),
            patchUriScheme: patchUriScheme.bind(this),
            patchOauth: patchOauth.bind(this),
            patchWebsockets: patchWebsockets.bind(this),
            patchReactNativeNavigation: patchReactNativeNavigation.bind(this),
            appendFiles: appendFiles.bind(this),
            replacePackageJsonVersions() {
                this.debug('Replacing Package.json Versions');
                this.replacePackageJsonVersions('REPLACE_WITH_VERSION', path.join(__dirname, 'templates/package.json'));
            },
            composeEntities() {
                if (!this.withEntities) return;
                this.composeWithJHipster('jhipster-react-native:entities', { skipInstall: true }, true);
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
        };
    }

    get end() {
        const gitCommit = super._end().gitCommit.bind(this);
        return {
            modifyExpoDownloadScriptPermission() {
                try {
                    fs.chmodSync('e2e/download-expo.sh', '755');
                } catch (err) {
                    this.log(
                        `${chalk.yellow.bold(
                            'WARNING!'
                        )}Failed to make 'e2e/download-expo.sh' executable, you may need to run 'chmod +x e2e/download-expo.sh'`
                    );
                }
            },
            gitCommit,
        };
    }
};
