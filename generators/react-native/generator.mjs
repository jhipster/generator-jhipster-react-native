import * as _ from 'lodash-es';
import { relative } from 'node:path';
import chalk from 'chalk';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { generateTestEntity } from 'generator-jhipster/generators/client/support';
import { camelCase, kebabCase, startCase } from 'lodash-es';
import { createNeedleCallback } from 'generator-jhipster/generators/base/support';
import command from './command.mjs';
import { DEFAULT_BACKEND_PATH } from '../constants.mjs';
import files from './files.mjs';
import entityFiles from './entity-files.mjs';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true, jhipster7Migration: true });

    if (this.options.help) return;

    if (this.blueprintConfig.reactNativeDir) {
      throw new Error(
        'React Native generator must run in React Native application directory, to regenerate backend execute `jhipster-reactNative app`',
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
    if (this.options.defaults || this.options.force) {
      this.reactNativeStorage.defaults({ appDir: DEFAULT_BACKEND_PATH });
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

    await this.dependsOnJHipster('bootstrap-application');
    await this.dependsOnJHipster('init');
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {
        this.parseJHipsterCommand(command);
      },
    });
  }

  get [BaseApplicationGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      loadConfigFromBackend() {
        if (!this.blueprintConfig.appDir) return;

        try {
          this.copyDestination(this.destinationPath(this.blueprintConfig.appDir, '.jhipster', '**'), '.jhipster/');
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
      },
      blueprint() {
        // Add blueprint config to generator-jhipster namespace, so we can omit blueprint parameter when executing jhipster command
        const reactNativeBlueprints = this.jhipsterConfig.blueprints;
        if (!reactNativeBlueprints || !reactNativeBlueprints.find(blueprint => blueprint.name === 'generator-jhipster-react-native')) {
          this.jhipsterConfig.blueprints = [...(localBlueprints || []), { name: 'generator-jhipster-react-native' }];
        }
      },
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingTemplateTask({ application }) {
        const reactNativePackageVersion = application.blueprints.find(bp => bp.name === 'generator-jhipster-react-native').version;
        const reactNativeAppNameKebabCase = _.kebabCase(application.baseName);
        await this.writeFiles({
          sections: files,
          context: {
            ...application,
            reactNativePackageVersion,
            reactNativeAppNameKebabCase,
          },
        });

        await this.copyTemplateAsync('../resources/base/{**,**/.*}', this.destinationPath());

        if (application.authenticationTypeJwt) {
          await this.copyTemplateAsync('../resources/jwt/{**,**/.*}', this.destinationPath());
        }

        if (application.authenticationTypeOauth2) {
          await this.copyTemplateAsync('../resources/oauth2/{**,**/.*}', this.destinationPath());
        }
      },
    });
  }

  get [BaseApplicationGenerator.WRITING_ENTITIES]() {
    return this.asWritingEntitiesTaskGroup({
      async writeEntities({ application, entities }) {
        const { enableTranslation } = application;
        await Promise.all(
          entities
            .filter(entity => !entity.builtIn)
            .map(async entity => {
              await this.writeFiles({
                sections: entityFiles,
                context: {
                  ...entity,
                  enableTranslation,
                },
              });
              // write client side files for angular
              const { entityClassHumanized, entityAngularName, entityFileName, entityFolderName } = entity;
              this.editFile(
                'src/app/pages/entities/entities.page.ts',
                createNeedleCallback({
                  needle: 'jhipster-needle-add-entity-page',
                  contentToAdd: `{ name: '${entityClassHumanized}', component: '${entityAngularName}Page', route: '${entityFileName}' },`,
                  contentToCheck: `route: '${entityFileName}'`,
                }),
              );
              this.editFile(
                'src/app/pages/entities/entities.module.ts',
                createNeedleCallback({
                  needle: 'jhipster-needle-add-entity-route',
                  contentToAdd: `{ path: '${entityFileName}', loadChildren: () => import('./${entityFolderName}/${entityFileName}.module').then(m => m.${entityAngularName}PageModule) },`,
                  contentToCheck: `path: '${entityFileName}'`,
                }),
              );
            }),
        );
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
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
            '@reactNative/storage': undefined,
            '@reactNative/storage-angular': undefined,
            'reactNative-appauth': undefined,
          });
        }
        if (application.authenticationTypeOauth2) {
          this.packageJson.merge({
            jest: {
              moduleNameMapper: {
                '^@reactNative/storage$': '<rootDir>/node_modules/@reactNative/storage/dist/reactNative-storage.cjs.js',
              },
              transformIgnorePatterns: [
                'node_modules/(?!.*\\.mjs$|@ngrx|@reactNative-native|@reactNative|reactNative-appauth|capacitor-secure-storage-plugin)',
              ],
            },
          });
        }
      },
    });
  }

  get [BaseApplicationGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      async install() {
        try {
          if (this.env.sharedFs.get(this.destinationPath('package.json'))?.commited) {
            await this.spawnCommand('npm', ['install']);
          }
        } catch (error) {
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
${chalk.yellowBright("You will need to update your JHipster app's CORS settings when running this app on an emulator or device. ⚠️\n")}
${chalk.yellowBright('    iOS: capacitor://localhost')}
${chalk.yellowBright('    Android: http://localhost')}

Run the following commands (in separate terminal window) to see everything working:${changeDirMessage}
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
