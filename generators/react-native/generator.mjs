import { relative } from 'node:path';
import { readFile } from 'node:fs/promises';
import chalk from 'chalk';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { generateTestEntity } from 'generator-jhipster/generators/client/support';
import { camelCase, kebabCase, snakeCase, startCase } from 'lodash-es';
import semver from 'semver';
import { DEFAULT_BACKEND_PATH, DEFAULT_REACT_NATIVE_APP_NAME } from '../constants.mjs';
import files from './files.mjs';
import entityFiles from './entity-files.mjs';
import {
  appendFiles,
  getEntityFormField,
  getEntityFormFieldType,
  getFieldValidateType,
  getRelationshipFormField,
  patchBabel,
  patchEntityApi,
  patchInFile,
  patchNavigationForEntity,
} from './support/index.js';

export default class extends BaseApplicationGenerator {
  /** @type {string | undefined} */
  oldReactNativeBlueprintVersion;
  /** @type { any } */
  reactNativeBlueprintPackageJson;

  constructor(args, opts, features) {
    super(args, opts, { ...features, queueCommandTasks: true, sbsBlueprint: true, jhipster7Migration: true });

    if (this.options.help) return;

    if (this.blueprintConfig.reactNativeDir) {
      throw new Error(
        'React Native generator must run in React Native application directory, to regenerate backend execute `rnhipster app`',
      );
    }

    this.reactNativeStorage = this.blueprintStorage;
    this.reactNativeConfig = this.blueprintConfig;

    // Set defaultIndent to 2 to hide prompt
    this.jhipsterConfig.prettierDefaultIndent = 2;

    if (this.options.standalone) {
      this.reactNativeConfig.appDir = false;
    }
    if (this.options.appDir !== undefined) {
      this.reactNativeConfig.appDir = this.options.appDir;
    }
    if (this.options.baseName !== undefined) {
      this.jhipsterConfig.baseName = this.options.baseName;
    }
    if (this.options.authenticationType !== undefined) {
      this.jhipsterConfig.authenticationType = this.options.authenticationType;
    }
    if (this.options.defaults) {
      // using defaults options, detox is enabled by default
      this.reactNativeStorage.defaults({ appDir: DEFAULT_BACKEND_PATH, reactNativeDir: null, detox: true });
    }
  }

  async beforeQueue() {
    await this.prompt(
      [
        {
          type: 'input',
          name: 'appDir',
          message: 'Enter the directory where your JHipster app is located:',
          default: DEFAULT_BACKEND_PATH,
        },
      ],
      this.reactNativeStorage,
    );
    this.reactNativeStorage.defaults({ appDir: DEFAULT_BACKEND_PATH, reactNativeDir: null });

    if (this.reactNativeConfig.appDir) {
      this.addBackendStorages();
    }

    await this.dependsOnJHipster('bootstrap-application', {
      generatorOptions: {
        defaultBaseName: () => DEFAULT_REACT_NATIVE_APP_NAME,
      },
    });
    await this.dependsOnJHipster('init');
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializing({ control }) {
        this.oldReactNativeBlueprintVersion =
          (this.blueprintConfig.reactNativeBlueprintVersion ?? control.existingProject) ? '5.1.0' : undefined;
        this.reactNativeBlueprintPackageJson = JSON.parse((await readFile(this.templatePath('../../../package.json'), 'utf-8')).toString());
        this.blueprintConfig.reactNativeBlueprintVersion = this.reactNativeBlueprintPackageJson.version;
      },
    });
  }

  get [BaseApplicationGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      loadConfigFromBackend() {
        if (!this.blueprintConfig.appDir) return;

        try {
          this.copyDestination('.jhipster/**', '', { fromBasePath: this.destinationPath(this.blueprintConfig.appDir) });
        } catch {
          // No entities.
        }

        if (this.backendConfig?.entities && !this.jhipsterConfig.entities) {
          this.jhipsterConfig.entities = this.backendConfig.entities;
        }
        if (this.backendConfig?.baseName && !this.jhipsterConfig.projectName) {
          this.jhipsterConfig.projectName = `${startCase(this.backendConfig.baseName)}ReactNative`;
        }
        if (this.backendConfig?.authenticationType) {
          this.jhipsterConfig.authenticationType = this.backendConfig.authenticationType;
        }
        if (this.jhipsterConfig.enableTranslation === undefined && this.backendConfig?.enableTranslation !== undefined) {
          this.jhipsterConfig.enableTranslation = this.backendConfig.enableTranslation;
        }

        // Set default baseName.
        if (this.backendConfig?.baseName && !this.jhipsterConfig.baseName) {
          this.jhipsterConfig.baseName = `${this.backendConfig.baseName}ReactNative`;
        }

        if (this.backendConfig?.baseName) {
          const reactNativeDir = relative(this.destinationPath(this.reactNativeConfig.appDir), this.destinationPath());

          // Add back reference
          this.backendBlueprintConfig.reactNativeDir = reactNativeDir;
          this.backendBlueprintConfig.appDir = null;
        }

        // websocket: 'spring-websocket' or 'no';
        if (this.backendConfig?.websocket) {
          this.jhipsterConfig.websocket = this.backendConfig.websocket;
        }
      },
      blueprint() {
        // Add blueprint config to generator-jhipster namespace, so we can omit blueprint parameter when executing jhipster command
        const reactNativeBlueprints = this.jhipsterConfig.blueprints;
        if (!reactNativeBlueprints || !reactNativeBlueprints.find(blueprint => blueprint.name === 'generator-jhipster-react-native')) {
          this.jhipsterConfig.blueprints = [...(this.jhipsterConfig.blueprints || []), { name: 'generator-jhipster-react-native' }];
        }
      },
    });
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async compose() {
        await this.composeWithJHipster('git');
      },
    });
  }
  get [BaseApplicationGenerator.LOADING]() {
    return this.asLoadingTaskGroup({
      loading({ application }) {
        application.typescriptEslint = true;
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      fixes({ application }) {
        application.blueprintPackageVersion = application.blueprints.find(bp => bp.name === 'generator-jhipster-react-native').version;
        application.reactNativeAppNameKebabCase = kebabCase(application.baseName);
      },
      dependencies({ application }) {
        this.loadNodeDependenciesFromPackageJson(application.nodeDependencies, this.templatePath('package.json'));
        this.loadNodeDependenciesFromPackageJson(application.nodeDependencies, this.templatePath('../resources/expo/package.json'));
      },
      preparingPatchInFile() {
        this.patchInFile = patchInFile.bind(this);
      },
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async cleanup({ control }) {
        if (control.existingProject) {
          if (this.isVersionLessThan(this.oldReactNativeBlueprintVersion, '5.1.1')) {
            this.removeFile('.eslintrc.js');
          }
        }
        /*
        control.cleanupFiles(this.oldReactNativeBlueprintVersion, {
          '5.1.1': ['.eslintrc.js'],
        })
        */
      },
      async writingTemplateTask({ application }) {
        await this.writeFiles({
          sections: files,
          context: application,
        });
      },
      async patchBabel() {
        patchBabel.bind(this)();
      },
    });
  }

  differentRelationshipsWorkaround(entity) {
    // todo: remove this - need to figure out why context.differentRelationships
    // todo: has a value here but is undefined in the templates.
    const alreadyIncludedEntities = [];
    const uniqueEntityRelationships = [];
    entity.relationships.forEach(relation => {
      if (!alreadyIncludedEntities.includes(relation.otherEntityName)) {
        alreadyIncludedEntities.push(relation.otherEntityName);
        uniqueEntityRelationships.push(relation);
      }
    });
    return {
      uniqueOwnerSideRelationships: uniqueEntityRelationships.filter(relation => relation.ownerSide),
      ownerSideRelationships: entity.relationships.filter(relation => relation.ownerSide),
    };
  }

  get [BaseApplicationGenerator.WRITING_ENTITIES]() {
    return this.asWritingEntitiesTaskGroup({
      async writeEntities({ application, entities }) {
        await Promise.all(
          entities
            .filter(entity => !entity.builtIn)
            .map(async entity => {
              const { uniqueOwnerSideRelationships, ownerSideRelationships } = this.differentRelationshipsWorkaround(entity);
              const jhipsterVersion6 = this.jhipsterVersion && semver.major(semver.coerce(this.jhipsterVersion)) === '6';
              const fieldsContainEnum = entity.fields.filter(field => field.fieldIsEnum).length > 0;
              await this.writeFiles({
                sections: entityFiles,
                context: {
                  ...entity,
                  application: { ...application },
                  ...application,
                  reactNativeConfig: { ...this.reactNativeConfig },
                  fieldsContainEnum,
                  uniqueOwnerSideRelationships,
                  ownerSideRelationships,
                  getEntityFormField: getEntityFormField.bind(this),
                  getRelationshipFormField: getRelationshipFormField.bind(this),
                  getFieldValidateType: getFieldValidateType.bind(this),
                  getEntityFormFieldType: getEntityFormFieldType.bind(this),
                  entityNameSnakeCase: snakeCase(entity.entityNameCapitalized),
                  useOldPutMappingCode: jhipsterVersion6,
                  useOldDTOCode: jhipsterVersion6 && this.context.dto === 'mapstruct',
                },
              });
            }),
        );
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async patchUriScheme({ application }) {
        this.editFile('app.json', content => {
          const appConfig = JSON.parse(content);
          appConfig.expo.scheme = application.baseName.toLowerCase();
          appConfig.expo.extra = {};
          appConfig.expo.web = appConfig.expo.web || {};
          appConfig.expo.web.bundler = 'metro';
          return JSON.stringify(appConfig);
        });
      },
      async appendFiles() {
        appendFiles.bind(this)();
      },
      customizePackageJson({ application }) {
        const { baseName } = this.jhipsterConfig;
        this.packageJson.merge({
          name: kebabCase(baseName),
          scripts: {
            'backend:start': `cd ${this.reactNativeConfig.appDir} && npm run app:start`,
          },
        });
        if (application.authenticationTypeJwt) {
          this.debug('Removing oauth2 dependencies');
          this.packageJson.set('dependencies', {
            ...this.packageJson.get('dependencies'),
            'expo-auth-session': undefined,
            'expo-random': undefined,
            'expo-web-browser': undefined,
          });
        }
        if (application.authenticationTypeOauth2) {
          this.packageJson.merge({
            jest: {
              moduleNameMapper: {
                '^@reactNative/storage$': '<rootDir>/node_modules/@reactNative/storage/dist/reactNative-storage.cjs.js',
              },
            },
          });
        }
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING_ENTITIES]() {
    return this.asPostWritingEntitiesTaskGroup({
      async patchEntity({ application, entities }) {
        await Promise.all(
          entities
            .filter(entity => !entity.builtIn)
            .map(async entity => {
              patchNavigationForEntity.bind(this)(entity);
              const entityNameSnakeCase = snakeCase(entity.entityNameCapitalized);
              await patchEntityApi.bind(this)(application, { entityNameSnakeCase, ...entity });
            }),
        );
      },
    });
  }

  get [BaseApplicationGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      async install() {
        if (this.options.skipInstall) return;
        try {
          if (this.env.sharedFs.get(this.destinationPath('package.json'))?.committed) {
            await this.spawn('npm', ['install']);
          }
        } catch {
          this.log.error(`Error executing 'npm install', execute by yourself.`);
        }
      },
    });
  }

  get [BaseApplicationGenerator.END]() {
    return this.asEndTaskGroup({
      afterRunHook() {
        const changeDirMessage = this.options.fromBackend
          ? `
${chalk.green(`    cd ${this.backendBlueprintConfig.reactNativeDir}`)}`
          : '';
        this.log(`
React Native for JHipster App created successfully! 🎉
${chalk.yellowBright("\nYou will need to update your JHipster app's CORS settings: ⚠️\n")}
${chalk('    Web: ')}${chalk.yellowBright('http://localhost:8081')}
${chalk('    Android: ')}${chalk.yellowBright('http://localhost')}

Run the following commands (in a separate terminal window) to see everything working:${changeDirMessage}
${chalk.green(`    npm run backend:start`)}
${chalk.green(`    npm start`)}
`);
      },
    });
  }

  /**
   * @private
   * Update Storages for React Native
   */
  addBackendStorages() {
    const appYoRc = `${this.blueprintConfig.appDir}/.yo-rc.json`;
    this.backendStorage = this.createStorage(appYoRc, 'generator-jhipster', { sorted: true });
    this.backendConfig = this.backendStorage.createProxy();
    this.backendBlueprintStorage = this.createStorage(appYoRc, this.rootGeneratorName(), { sorted: true });
    this.backendBlueprintConfig = this.backendBlueprintStorage.createProxy();
  }

  /**
   * @private
   * Generate a test entity instance with faked values.
   *
   * @param {any} references - references to other entities.
   * @param {any} additionalFields - additional fields to add to the entity or with default values that overrides generated values.
   */

  generateTestEntity(references, additionalFields) {
    return generateTestEntity(references, additionalFields);
  }

  /**
   * private
   * Generate Entity Queries for React Native Providers
   *
   * @param {Array|Object} relationships - array of relationships
   * @param {string} entityInstance - entity instance
   * @param {string} dto - dto
   * @returns {{queries: Array, variables: Array, hasManyToMany: boolean}}
   */

  generateEntityQueries(relationships, entityInstance, dto) {
    // workaround method being called on initialization
    if (!relationships) {
      return;
    }
    const queries = [];
    const variables = [];
    let hasManyToMany = false;
    relationships.forEach(relationship => {
      let query;
      let variableName;
      hasManyToMany = hasManyToMany || relationship.relationshipType === 'many-to-many';
      if (relationship.otherRelationship && relationship.relationshipType === 'one-to-one' && relationship.ownerSide === true) {
        variableName = camelCase(relationship.otherEntityNameCapitalizedPlural);
        if (variableName === entityInstance) {
          variableName += 'Collection';
        }
        const relationshipFieldName = `this.${entityInstance}.${relationship.relationshipFieldName}`;
        const relationshipFieldNameIdCheck =
          dto === 'no' ? `!${relationshipFieldName} || !${relationshipFieldName}.id` : `!${relationshipFieldName}Id`;

        query = `this.${relationship.otherEntityName}Service
            .query({filter: '${relationship.otherEntityRelationshipName.toLowerCase()}-is-null'})
            .subscribe(data => {
                if (${relationshipFieldNameIdCheck}) {
                    this.${variableName} = data.body;
                } else {
                    this.${relationship.otherEntityName}Service
                        .find(${relationshipFieldName}${dto === 'no' ? '.id' : 'Id'})
                        .subscribe((subData: HttpResponse<${relationship.otherEntityAngularName}>) => {
                            this.${variableName} = [subData.body].concat(subData.body);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));`;
      } else if (relationship.relationshipType !== 'one-to-many') {
        variableName = camelCase(relationship.otherEntityNameCapitalizedPlural);
        if (variableName === entityInstance) {
          variableName += 'Collection';
        }
        query = `this.${relationship.otherEntityName}Service.query()
            .subscribe(data => { this.${variableName} = data.body; }, (error) => this.onError(error));`;
      }
      if (variableName && !queries.includes(query)) {
        queries.push(query);
        variables.push(`${variableName}: ${relationship.otherEntityAngularName}[];`);
      }
    });

    return {
      queries,
      variables,
      hasManyToMany,
    };
  }
}
