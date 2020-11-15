const chalk = require('chalk');
const fse = require('fs-extra');
const spawn = require('cross-spawn');

function generateReactNativeApp() {
    const reactNativeVersion = '0.63.3';
    const name = this.reactNativeAppName;
    this.info(chalk.green("Running 'npx react-native init', this will take some time..."));
    spawn.sync('npx', ['react-native', 'init', '--version', reactNativeVersion, '--skip-install', name], {
        stdio: this.debug ? 'inherit' : 'ignore',
    });

    // collapse generated RN folder into parent folder
    const rnFiles = [
        // don't copy these
        // '__tests__',
        // '.prettierrc.js',
        // 'app.js',
        '.buckconfig',
        '.eslintrc.js',
        '.flowconfig',
        '.gitattributes',
        '.gitignore',
        '.watchmanconfig',
        'android',
        'app.json',
        'babel.config.js',
        'index.js',
        'ios',
        'metro.config.js',
        'package.json',
    ];
    rnFiles.forEach(file => {
        this.fs.move(`${process.cwd()}/${name}/${file}`, `${process.cwd()}/${file}`, { overwrite: true });
    });
    fse.removeSync(`${process.cwd()}/${name}/`);
}

module.exports = { generateReactNativeApp };
