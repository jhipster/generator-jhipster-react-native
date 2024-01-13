/* eslint-disable consistent-return */
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import semver from 'semver';
import AppGenerator from 'generator-jhipster/generators/app';
import { stringHashCode } from 'generator-jhipster/generators/base/support';
import { askDetoxPrompt, askNamePrompt, askBackendPrompt } from './prompts.js';
import { writeFiles } from './files.js';
import packageJson from '../../package.json' assert { type: 'json' };
import { printJHipsterLogo, loadVariables, setupVariables, createEarlyFiles, appendFiles, patchInFile, patchBabel } from '../../lib/index.js';

export default class extends AppGenerator {
  constructor(args, opts, features) {
    super(args, { skipClient: false, ...opts }, features); // fromBlueprint variable is important

    if (this.options.help) {
      return;
    }

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

    this.reactNativeBlueprintVersion =
      this.blueprintConfig.reactNativeBlueprintVersion ||
      ((this.jhipsterConfig.blueprints || []).find(blueprint => blueprint.name === 'generator-jhipster-react-native') || {}).version;
    this.blueprintConfig.reactNativeBlueprintVersion = packageJson.version;
  }

  get [AppGenerator.INITIALIZING]() {
    printJHipsterLogo(this);
    return {
      loadVariables: loadVariables.bind(this),
    };
  }

  get [AppGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      askNamePrompt,
      askBackendPrompt: askBackendPrompt.bind(this),
      askDetoxPrompt,
    });
  }

  get [AppGenerator.CONFIGURING]() {
    return {};
  }

  get [AppGenerator.DEFAULT]() {
    return {};
  }

  get [AppGenerator.LOADING]() {
    return super._loading();
  }

  get [AppGenerator.WRITING]() {
    return {
      setupVariables,
      cleanup() {
        if (this._isReactNativeVersionLessThan('4.3.1')) {
          this.removeFile('.npmrc');
        }
        if (this._isReactNativeVersionLessThan('4.3.1')) {
          this.removeFile('webpack.config.js');
        }
      },
      loadConfig() {
        // load config after prompting to allow loading from backend .yo-rc.json
        this.loadAppConfig(this.config.getAll(), this.context);
        this.loadServerConfig(this.config.getAll(), this.context);
        this.hipsterImage = stringHashCode(this.context.baseName) % 4;
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
      writeFiles: writeFiles.bind(this),
      patchUriScheme() {
        const appConfig = this.fs.readJSON('app.json');
        appConfig.expo.scheme = this.context.reactNativeAppName.toLowerCase();
        appConfig.expo.extra = {};
        appConfig.expo.web = appConfig.expo.web || {};
        appConfig.expo.web.bundler = 'metro';
        this.fs.writeJSON('app.json', appConfig);
      },
      appendFiles: appendFiles.bind(this),
      patchBabel: patchBabel.bind(this),
      replacePackageJsonVersionsInGeneratedApp() {
        this.debug('Replacing Package.json Versions');
        this.replacePackageJsonVersions('REPLACE_WITH_VERSION', path.join(__dirname, 'templates/package.json'));
        this.replacePackageJsonVersions('EXPO_REPLACE_WITH_VERSION', path.join(__dirname, 'resources/expo/package.json'));
      },
      composeEntities() {
        if (!this.withEntities) return;
        this.composeWithJHipster('jhipster-react-native:entities', { skipInstall: true }, true);
      },
    };
  }

  get [AppGenerator.INSTALL]() {
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

  get [AppGenerator.END]() {
    //TODO: gitCommit
    //const gitCommit = super.end().gitCommit.bind(this);
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
      }      
    };
  }

  _isReactNativeVersionLessThan(version, fallback = false) {
    return (this.reactNativeBlueprintVersion && semver.lt(version, this.reactNativeBlueprintVersion)) || fallback;
  }
}
