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

        // regardless of the value of skipClient, we want to prettify JS/TS/TSX files
        // this does not look to be configurable from blueprints (see getPrettierExtensions in generator-base.js)
        // skipClient has no effect for generator-jhipster-react-native since it only generates a client
        this.skipClient = false;
        this.jhipsterConfig.skipClient = false;
        this.registerPrettierTransform();
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
        return {
            loadConfig() {
                // load config after prompting to allow loading from backend .yo-rc.json
                this.loadAppConfig(this.config.getAll(), this.context)
                this.loadServerConfig(this.config.getAll(), this.context)
            },
            setUpVariables: setupVariables.bind(this),
            checkAppAuthType() {
                // exit on invalid auth type
                const authType = this.context.authenticationType;
                if (!['jwt', 'oauth2'].includes(authType)) {
                    this.error(`Unsupported authentication type ${authType} - Only JWT and OAuth2 authentication types are supported.`);
                }
            },
            setUpTemplateVariables() {
                this.context.reactNativeAppNameKebabCase = this._.kebabCase(this.context.reactNativeAppName);
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
        const { initGitRepo } = super._install();
        return {
            initGitRepo,
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
