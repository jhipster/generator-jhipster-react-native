const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const semver = require('semver')
const { askForBackendJson } = require('./prompts');
const { writeFiles } = require('./files');
const {
    patchInFile,
    patchNavigationForEntity,
    patchEntityApi,
    loadVariables,
    getEntityFormField,
    getRelationshipFormField,
    getFieldValidateType,
    getEntityFormFieldType,
} = require('../../lib');

module.exports = class extends EntityGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, angularSuffix: '', ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            console.log('No jhContext found after initializing blueprint (entity generator)');
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints react-native')}`);
        }

        this.patchInFile = patchInFile.bind(this);
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return {
            askForBackendJson: askForBackendJson.bind(this),
        };
    }

    get configuring() {
        return super._configuring();
    }

    get loading() {
        return {
            ...super._loading(),
            loadVariables: loadVariables.bind(this),
        };
    }

    get preparing() {
        return {
            ...super._preparing(),
            addHelpers() {
                // add custom methods to the context
                this.context.getEntityFormField = getEntityFormField.bind(this);
                this.context.getRelationshipFormField = getRelationshipFormField.bind(this);
                this.context.getFieldValidateType = getFieldValidateType.bind(this);
                this.context.getEntityFormFieldType = getEntityFormFieldType.bind(this);
                // DTO compatability for v6
                this.context.useOldDTOCode = semver.major(semver.coerce(this.context.jhipsterVersion)) === '6' && this.context.dto === 'mapstruct';
                // log the context for debugging purposes
                if ((this.configOptions && this.configOptions.isDebugEnabled) || (this.options && this.options.debug)) {
                    // console.log(this.context);
                }
            },
        };
    }

    get preparingRelationships() {
        return {
            ...super._preparingRelationships(),
            differentRelationshipsWorkaround () {
                // todo: remove this - need to figure out why context.differentRelationships
                // todo: has a value here but is undefined in the templates.
                const alreadyIncludedEntities = []
                const uniqueEntityRelationships = []
                this.context.relationships.forEach((relation) => {
                    if (!alreadyIncludedEntities.includes(relation.otherEntityName)) {
                        alreadyIncludedEntities.push(relation.otherEntityName)
                        uniqueEntityRelationships.push(relation)
                    }
                })
                this.context.uniqueOwnerSideRelationships = uniqueEntityRelationships.filter((relation) => relation.ownerSide)
                this.context.ownerSideRelationships = this.context.relationships.filter((relation) => relation.ownerSide)
            }
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
