const fse = require('fs-extra');
const packagejs = require('../package.json');

function loadVariables() {
    this.existingProject = fse.existsSync('.yo-rc.json');
    if (this.existingProject) {
        const jhipsterConfig = this.config.getAll();
        if (Object.prototype.hasOwnProperty.call(jhipsterConfig, 'baseName')) {
            this.existingProject = true;
            if (Object.prototype.hasOwnProperty.call(jhipsterConfig, 'reactNative')) {
                this.context.reactNativeAppName = jhipsterConfig.reactNative.reactNativeAppName;
                this.context.detox = jhipsterConfig.reactNative.detox;
            } else {
                this.debug('React Native config not found, will prompt');
            }
        }
    }
}
function setupVariables() {
    let jhipsterConfig;
    if (this.options.fromJdl || this.existingProject) {
        this.debug('Generating app from JDL, setting default values for React Native config');
        jhipsterConfig = this.config.getAll();
        loadVariables.bind(this)();
    } else {
        const configFilePath = `${this.directoryPath}/.yo-rc.json`;
        this.debug(`Fetching config file from ${configFilePath}`);
        try {
            jhipsterConfig = this.fs.readJSON(configFilePath)['generator-jhipster'];
        } catch (e) {
            this.error(`Couldn't load JHipster configuration from ${configFilePath}`);
        }
    }

    this.context.packageVersion = packagejs.version;

    this.config.set({
        reactNative: {
            reactNativeAppName: this.context.reactNativeAppName,
            detox: this.context.detox,
            backend: this.directoryPath,
        },
        ...jhipsterConfig,
    });
}
module.exports = {
    loadVariables,
    setupVariables,
};
