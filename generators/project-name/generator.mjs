import ProjectNameGenerator from 'generator-jhipster/generators/project-name';
import { DEFAULT_REACT_NATIVE_APP_NAME } from '../constants.mjs';
import command from './command.mjs';

export default class extends ProjectNameGenerator {
  constructor(args, opts, features) {
    super(args, opts, { checkBlueprint: true, ...features });
  }

  get [ProjectNameGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      ...super.initializing,
      async initializingTemplateTask() {
        this.parseJHipsterArguments(command.arguments);
        this.parseJHipsterOptions(command.options);
      },
      defaults() {
        if (this.options.defaults || this.options.force) {
          this.config.defaults({
            baseName: this.getDefaultReactNativeName(),
          });
        }
      },
    });
  }

  get [ProjectNameGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      ...super.prompting,

      // Replace prompts with custom questions
      async showPrompts() {
        await this.prompt(
          [
            {
              name: 'baseName',
              type: 'input',
              validate: input => this.validateBaseName(input),
              message: 'What do you want to name your ReactNative application?',
              default: this.getDefaultReactNativeName(),
            },
          ],
          this.config,
        );
      },
    });
  }

  get [ProjectNameGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      ...super.configuring,
      async configuringTemplateTask() {},
    });
  }

  get [ProjectNameGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      ...super.composing,
      async composingTemplateTask() {},
    });
  }

  get [ProjectNameGenerator.LOADING]() {
    return this.asLoadingTaskGroup({
      ...super.loading,
      async loadingTemplateTask() {},
    });
  }

  get [ProjectNameGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      ...super.preparing,
      async preparingTemplateTask() {},
    });
  }

  get [ProjectNameGenerator.DEFAULT]() {
    return this.asDefaultTaskGroup({
      ...super.default,
      async defaultTemplateTask() {},
    });
  }

  get [ProjectNameGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      ...super.writing,
    });
  }

  get [ProjectNameGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      ...super.postWriting,
      async postWritingTemplateTask() {},
    });
  }

  get [ProjectNameGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      ...super.install,
      async installTemplateTask() {},
    });
  }

  get [ProjectNameGenerator.END]() {
    return this.asEndTaskGroup({
      ...super.end,
      async endTemplateTask() {},
    });
  }

  getDefaultReactNativeName() {
    return DEFAULT_REACT_NATIVE_APP_NAME;
  }
}
