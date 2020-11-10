const packagejs = require('../../../package.json');

function loadVariables() {
    const jhipsterConfig = this.config.getAll();
    if (Object.prototype.hasOwnProperty.call(jhipsterConfig, 'baseName')) {
        this.existingProject = true;
        if (Object.prototype.hasOwnProperty.call(jhipsterConfig, 'reactNative')) {
            this.reactNativeAppName = jhipsterConfig.reactNative.reactNativeAppName;
            this.detox = jhipsterConfig.reactNative.detox;
        } else {
            this.debug('React Native config not found, will prompt');
        }
    }
}
function setupVariables() {
    let jhipsterConfig;
    if (this.options.fromJdl || this.existingProject) {
        this.debug('Generating app from JDL, setting default values for React Native config');
        jhipsterConfig = this.config.getAll();
        // // todo defaults for this?
        // this.reactNativeAppName = this._.upperFirst(this._.camelCase(jhipsterConfig.baseName));
        // this.detox = true;
    } else {
        const configFilePath = `${this.directoryPath}/.yo-rc.json`;
        this.debug(`Fetching config file from ${configFilePath}`);
        try {
            jhipsterConfig = this.fs.readJSON(configFilePath)['generator-jhipster'];
        } catch (e) {
            this.error(`Couldn't load JHipster configuration from ${configFilePath}`);
        }
    }

    this.authType = jhipsterConfig.authenticationType;
    this.websocket = jhipsterConfig.websocket || false;
    this.searchEngine = jhipsterConfig.searchEngine || false;
    this.applicationType = jhipsterConfig.applicationType;
    this.uaaBaseName = this.authType === 'uaa' ? jhipsterConfig.uaaBaseName.toLowerCase() : '';
    this.useNpm = true;
    this.skipCommitHook = false;
    this.packageVersion = packagejs.version;
    this.androidPackageName = this.reactNativeAppName.toLowerCase();
    // used for JHipster templates
    this.packageFolder = jhipsterConfig.packageFolder;

    this.config.set({
        reactNative: {
            reactNativeAppName: this.reactNativeAppName,
            detox: this.detox,
            useNpm: this.useNpm,
            backend: this.directoryPath,
            version: this.packageVersion,
        },
        ...jhipsterConfig,
    });
}
module.exports = {
    loadVariables,
    setupVariables,
};
