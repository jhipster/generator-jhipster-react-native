const path = require('path');
const shelljs = require('shelljs');

const { getAppFolder } = require('../../lib');

module.exports = {
    askNamePrompt,
    askDetoxPrompt,
    askBackendPrompt,
};

function checkForApp(input) {
    const path = this.destinationPath(input);
    if (shelljs.test('-d', path)) {
        const appsFolders = getAppFolder.call(this, input);
        if (appsFolders.length === 0) {
            return `No application found in ${path}`;
        }
        return true;
    }
    return `${path} is not a directory or doesn't exist`;
}

function askNamePrompt(meta) {
    // if (!meta) return;
    if (this.options.defaults) {
        this.reactNativeAppName = 'RnApp';
        return;
    }

    const prompts = [
        {
            type: 'input',
            name: 'appName',
            message: 'What do you want to name your React Native application?',
            default: 'RnApp',
        },
    ];

    // if (meta) return prompts; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.prompt(prompts);
    promise.then(props => {
        this.reactNativeAppName = props.appName;
        done();
    });
}
function askDetoxPrompt(meta) {
    if (this.options.defaults) {
        this.detox = true;
        return;
    }
    // if (!meta) return;
    const prompts = [
        {
            type: 'confirm',
            name: 'detox',
            message: 'Do you want to enable end-to-end tests with Detox?',
            default: false,
        },
    ];
    // if (meta) return prompts; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.prompt(prompts);
    promise.then(props => {
        this.detox = props.detox;
        done();
    });
}
function askBackendPrompt(meta) {
    // if (!meta) return;
    if (this.existingProject) return;

    if (this.options.defaults) {
        this.directoryPath = path.resolve('../backend');
        return;
    }

    const prompts = [
        {
            type: 'input',
            name: 'directoryPath',
            message: 'Enter the directory where your JHipster app is located:',
            default: '../backend',
            validate: checkForApp.bind(this),
        },
    ];
    // if (meta) return prompts; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.prompt(prompts);
    promise.then(props => {
        this.directoryPath = path.resolve(props.directoryPath);
        done();
    });
}
