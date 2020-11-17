const pluralize = require('pluralize');
const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const { askForBackendJson } = require('./prompts');
const { writeFiles } = require('./files');
const { patchInFile, patchNavigationForEntity, patchEntityApi, getEntityFormField, getRelationshipFormField } = require('../../lib');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            console.log('No jhContext found after initializing blueprint (entity generator)');
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints react-native')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext._setupEntityOptions(this, jhContext, this);
        this.patchInFile = patchInFile.bind(this);
    }

    get initializing() {
        return {};
    }

    get prompting() {
        return {
            askForBackendJson: askForBackendJson.bind(this),
        };
    }

    _setUpVariables() {
        this.searchEngine = this.config.get('searchEngine');

        const reactNativeConfig = this.config.get('reactNative');
        if (reactNativeConfig) {
            this.detox = reactNativeConfig.detox;
        } else {
            this.info('Defaulting to false for Detox');
            this.detox = false;
        }

        this.name = this.options.name;
        this.pluralName = pluralize(this.name);
        this.camelCaseName = this._.camelCase(this.name);
        this.camelCaseNamePlural = pluralize(this.camelCaseName);
        this.kebabCaseName = this._.kebabCase(this.name);
        this.kebabCaseNamePlural = this._.kebabCase(this.pluralName);
        this.snakeCaseName = this._.snakeCase(this.name);
        this.context.entityNameCapitalized = this._.upperFirst(this.name);

        // todo remove - used in relationships
        this.camelCase = this._.camelCase;
        this.kebabCase = this._.kebabCase;
        this.upperFirst = this._.upperFirst;
        this.pascalCase = str => this._.upperFirst(this._.camelCase(str));

        this.getEntityFormField = getEntityFormField.bind(this);
        this.getRelationshipFormField = getRelationshipFormField.bind(this);

        // load entity JSON from config file
        this.entityInfo = this.context.entityJSON;
        this.entityContainsDate = false;
        this.entityContainsLocalDate = false;

        this.entityInfo.fields.forEach(field => {
            field.fieldIsEnum = ![
                'String',
                'Integer',
                'Long',
                'Float',
                'Double',
                'BigDecimal',
                'LocalDate',
                'Instant',
                'ZonedDateTime',
                'Boolean',
                'byte[]',
                'ByteBuffer',
            ].includes(field.fieldType);
            if (field.fieldType === 'LocalDate') {
                this.entityContainsLocalDate = true;
            }
            if (field.fieldType === 'LocalDate' || field.fieldType === 'ZonedDateTime' || field.fieldType === 'Instant') {
                this.entityContainsDate = true;
            }
        });
        // these lists are to prevent double imports when there are multiple relations between the same entity
        const alreadyIncludedEntities = [];
        const uniqueEntityRelationships = [];
        this.entityInfo.relationships.forEach(relation => {
            if (relation.relationshipType === 'many-to-one') {
                relation.ownerSide = true;
            }
            relation.otherEntityNamePlural = pluralize.plural(relation.otherEntityName);
            relation.relationshipNamePlural = pluralize.plural(relation.relationshipName);
            if (!alreadyIncludedEntities.includes(relation.otherEntityName)) {
                alreadyIncludedEntities.push(relation.otherEntityName);
                uniqueEntityRelationships.push(relation);
            }
        });

        this.entityInfo.uniqueOwnerSideRelationships = uniqueEntityRelationships.filter(relation => relation.ownerSide);
        this.entityInfo.ownerSideRelationships = this.entityInfo.relationships.filter(relation => relation.ownerSide);

        // todo this
        this.microservicePath = '';
        // if a microservice name is available, set the path prefix in the API paths
        if (Object.prototype.hasOwnProperty.call(this.entityInfo, 'microserviceName')) {
            this.microservicePath = `services/${this.entityInfo.microserviceName}/`;
        }
    }

    get configuring() {
        return {
            setUpVariables: this._setUpVariables,
        };
    }

    get default() {
        return {};
    }

    get writing() {
        return {
            writeFiles: writeFiles.bind(this),
            patchNavigationForEntity: patchNavigationForEntity.bind(this, this.context.name),
            patchEntityApi: patchEntityApi.bind(this, this.context.name),
        };
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
