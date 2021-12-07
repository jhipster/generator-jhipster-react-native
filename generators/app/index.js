/* eslint-disable consistent-return */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const AppGenerator = require('generator-jhipster/generators/app');
const jhipsterUtils = require('generator-jhipster/generators/utils');
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
  patchInFile,
} = require('../../lib');

module.exports = class extends AppGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, skipClient: false, ...opts }); // fromBlueprint variable is important

    this.patchInFile = patchInFile.bind(this);
    if (!this.context) {
      this.context = {};
    }

    // regardless of the value of skipClient, we want to prettify JS/TS/TSX files
    // this does not look to be configurable from blueprints (see getPrettierExtensions in generator-base.js)
    // skipClient has no effect for generator-jhipster-react-native since it only generates a client
    this.skipClient = false;
    // another workaround for changed JHipster behavior.
    if (!this.jhipsterConfig) {
      this._config = this._getStorage('generator-jhipster');
      this.jhipsterConfig = this.config.createProxy();
    }
    this.jhipsterConfig.skipClient = false;
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
      setUpVariables: setupVariables.bind(this),
      loadConfig() {
        // load config after prompting to allow loading from backend .yo-rc.json
        this.loadAppConfig(this.config.getAll(), this.context);
        this.loadServerConfig(this.config.getAll(), this.context);
        this.hipsterImage = jhipsterUtils.stringHashCode(this.context.baseName) % 4;
      },
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
      patchUriScheme() {
        const appConfig = this.fs.readJSON('app.json');
        appConfig.expo.scheme = this.context.reactNativeAppName.toLowerCase();
        appConfig.expo.extra = {};
        this.fs.writeJSON('app.json', appConfig);
      },
      appendFiles: appendFiles.bind(this),
      replacePackageJsonVersionsInGeneratedApp() {
        this.debug('Replacing Package.json Versions');
        this.replacePackageJsonVersions('REPLACE_WITH_VERSION', path.join(__dirname, 'templates/package.json'));
        this.replacePackageJsonVersions('EXPO_REPLACE_WITH_VERSION', path.join(__dirname, 'templates/package.expo.json'));
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
        if (this.context.detox) {
          try {
            fs.chmodSync('e2e/scripts/download-expo.sh', '755');
            fs.chmodSync('e2e/scripts/setup.sh', '755');
          } catch (err) {
            this.log(
              `${chalk.yellow.bold(
                'WARNING!'
              )}Failed to make 'e2e/scripts/*.sh' executable, you may need to run 'chmod +x e2e/scripts/*.sh'`
            );
          }
        }
      },
      gitCommit,
    };
  }
};
