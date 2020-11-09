const packagejs = require('../../../package.json');

function setupVariables() {
    let jhipsterConfig;
    if (this.options.fromJdl) {
        console.log('App from JDL');
        jhipsterConfig = this.config.getAll();
        // todo defaults for this?
        this.reactNativeAppName = this._.upperFirst(this._.camelCase(jhipsterConfig.baseName));
        this.detox = true;
    } else if (this.existingProject) {
        jhipsterConfig = this.config.getAll();
        this.reactNativeAppName =
            jhipsterConfig.reactNative.reactNativeAppName || this._.upperFirst(this._.camelCase(jhipsterConfig.baseName));
        this.detox = jhipsterConfig.reactNative.detox;
    } else {
        const configFilePath = `${this.directoryPath}/.yo-rc.json`;
        console.log(this.meta);
        console.log(configFilePath);
        jhipsterConfig = this.fs.readJSON(configFilePath)['generator-jhipster'];
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
    setupVariables,
};
