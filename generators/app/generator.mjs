import { relative } from 'node:path';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { DEFAULT_REACT_NATIVE_PATH, REACT_NATIVE_NAMESPACE } from '../constants.mjs';
import command from './command.mjs';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  beforeQueue() {
    if (this.blueprintConfig.appDir) {
      throw new Error('jhipster-reactNative:app generator must run in backend application directory');
    }
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {
        this.parseJHipsterArguments(command.arguments);
        this.parseJHipsterOptions(command.options);
      },
      loadConfigFromJHipster() {
        if (this.options.defaults || this.options.force) {
          this.blueprintStorage.defaults({ reactNativeDir: DEFAULT_REACT_NATIVE_PATH });
        }
      },
    });
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async promptForReactNativeDir() {
        await this.prompt(
          [
            {
              type: 'input',
              name: 'reactNativeDir',
              message: 'Where do you want to generate a React Native application?',
              default: DEFAULT_REACT_NATIVE_PATH,
            },
          ],
          this.blueprintStorage,
        );
        this.blueprintStorage.defaults({ reactNativeDir: DEFAULT_REACT_NATIVE_PATH });
      },
    });
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composeReactNative() {
        if (this.jhipsterConfig.applicationType === 'microservice') return;
        const reactNativeDir = this.destinationPath(this.blueprintConfig.reactNativeDir);
        const appDir = relative(reactNativeDir, this.destinationPath());
        await this.composeWithJHipster(`${REACT_NATIVE_NAMESPACE}:react-native`, {
          generatorOptions: {
            destinationRoot: reactNativeDir,
            appDir,
          },
        });
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      keycloak({ application }) {
        if (!application.authenticationTypeOauth2) return;

        // Increase wait for macOS. Keyclock container start can take over 3 min. 4 min is not enough to download/start containers/start server.
        this.editFile('src/main/docker/keycloak.yml', { assertModified: true }, content => content.replace('retries: 20', 'retries: 40'));
      },
    });
  }
}
