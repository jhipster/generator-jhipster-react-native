const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
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

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext._setupEntityOptions(this, jhContext, this);
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

                // log the context for debugging purposes
                if ((this.configOptions && this.configOptions.isDebugEnabled) || (this.options && this.options.debug)) {
                    // console.log(this.context);
                }
            },
        };
    }

    get preparingRelationships() {
        return super._preparingRelationships();
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
