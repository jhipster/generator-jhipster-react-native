const chalk = require('chalk');
const spawn = require('cross-spawn');
const fs = require('fs-extra');

function generateReactNativeApp() {
    const name = 'TestApp';
    console.log(chalk.white("Running 'npx react-native init'"));
    spawn.sync('npx', ['react-native', 'init', '--version', '0.63.3', '--skip-install', name], { stdio: 'inherit' });

    // collapse generated RN folder into parent folder
    const rnFiles = [
        '.buckconfig',
        '.eslintrc.js',
        '.flowconfig',
        '.gitattributes',
        '.gitignore',
        '.prettierrc.js',
        '.watchmanconfig',
        'App.js',
        // don't copy this
        // '__tests__',
        'android',
        'app.json',
        'babel.config.js',
        'index.js',
        'ios',
        'metro.config.js',
        'package.json',
    ];
    rnFiles.forEach(file => {
        fs.moveSync(`${process.cwd()}/${name}/${file}`, `${process.cwd()}/${file}`, { overwrite: true });
    });
    fs.removeSync(`${process.cwd()}/${name}/`);
}

module.exports = { generateReactNativeApp };
