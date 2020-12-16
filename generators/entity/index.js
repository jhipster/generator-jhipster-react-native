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
        this.startCase = this._.startCase;
        this.camelCase = this._.camelCase;
        this.kebabCase = this._.kebabCase;
        this.upperFirst = this._.upperFirst;
        this.pascalCase = str => this._.upperFirst(this._.camelCase(str));

        this.getEntityFormField = getEntityFormField.bind(this);
        this.getRelationshipFormField = getRelationshipFormField.bind(this);

        // load entity JSON from config file
        this.entityInfo = this.context.entityJSON;
        this.entityContainsImageBlob = false;
        this.entityContainsTextBlob = false;
        this.entityContainsDate = false;
        this.entityContainsLocalDate = false;

        this.entityInfo.fields.forEach(field => {
            // enums
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
                'Duration',
                'UUID',
                'Boolean',
                'byte[]',
                'ByteBuffer',
            ].includes(field.fieldType);

            // blobs
            if (field.fieldType === 'byte[]' && field.fieldTypeBlobContent === 'image') {
                this.entityContainsImageBlob = true;
            }
            if (field.fieldType === 'byte[]' && field.fieldTypeBlobContent === 'text') {
                this.entityContainsTextBlob = true;
            }

            // dates
            if (field.fieldType === 'LocalDate') {
                this.entityContainsLocalDate = true;
            }
            if (field.fieldType === 'LocalDate' || field.fieldType === 'ZonedDateTime' || field.fieldType === 'Instant') {
                this.entityContainsDate = true;
            }

            // validation
            field.fieldValidate = Array.isArray(field.fieldValidateRules) && field.fieldValidateRules.length >= 1;
            switch (field.fieldType) {
                case 'LocalDate':
                case 'ZonedDateTime':
                case 'Instant':
                    field.fieldValidateType = 'date';
                    break;
                case 'Integer':
                case 'Long':
                case 'Float':
                case 'Double':
                case 'BigDecimal':
                    field.fieldValidateType = 'number';
                    break;
                case 'byte[]':
                case 'String':
                case 'Duration':
                default:
                    field.fieldValidateType = 'string';
            }

            field.nullable = !(field.fieldValidate === true && field.fieldValidateRules.includes('required'));
            field.unique = field.fieldValidate === true && field.fieldValidateRules.includes('unique');
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

        // todo
        this.hasValidationRule = this.entityInfo.fields.some(
            field =>
                field.fieldValidate &&
                (field.fieldValidateRules.includes('required') ||
                    field.fieldValidateRules.includes('minlength') ||
                    field.fieldValidateRules.includes('maxlength') ||
                    field.fieldValidateRules.includes('min') ||
                    field.fieldValidateRules.includes('max') ||
                    field.fieldValidateRules.includes('pattern'))
        );

        this.hasRequiredRelationship = this.entityInfo.relationships.some(relationship => relationship.relationshipRequired);
        this.isValidatorsRequired = this.hasValidationRule || this.hasRequiredRelationship;
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
