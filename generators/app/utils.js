const chalk = require('chalk');
const spawn = require('cross-spawn');
const fs = require('fs-extra');
const shelljs = require('shelljs');

const packagejs = require('../../package.json');

const generateReactNativeApp = context => {
    const name = 'TestApp';
    context.log(chalk.white("Running 'npx react-native init'"));
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
        '__tests__',
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
};
const printJHipsterLogo = context => {
    context.log('\n');
    context.log(`${chalk.cyan('                         ██╗ ██╗  ██╗')}${chalk.green('        ')}${chalk.red('██████╗  ███╗   ██╗  ')}`);
    context.log(`${chalk.cyan('                         ██║ ██║  ██║')}${chalk.green('        ')}${chalk.red('██╔══██╗ ████╗  ██║  ')}`);
    context.log(`${chalk.cyan('                         ██║ ███████║')}${chalk.green(' █████╗ ')}${chalk.red('██████╔╝ ██╔██╗ ██║  ')}`);
    context.log(`${chalk.cyan('                   ██╗   ██║ ██╔══██║')}${chalk.green(' ╚════╝ ')}${chalk.red('██╔══██╗ ██║╚██╗██║  ')}`);
    context.log(`${chalk.cyan('                   ╚██████╔╝ ██║  ██║')}${chalk.green('        ')}${chalk.red('██║  ██║ ██║ ╚████║  ')}`);
    context.log(`${chalk.cyan('                    ╚═════╝  ╚═╝  ╚═╝')}${chalk.green('        ')}${chalk.red('╚═╝  ╚═╝ ╚═╝  ╚═══╝  ')}\n`);
    context.log(chalk.white.bold('                            https://www.jhipster.tech\n'));
    context.log(chalk.white('Welcome to JHipster React Native ') + chalk.yellow(`v${packagejs.version}`));
    context.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
    context.log(
        chalk.green(' _______________________________________________________________________________________________________________\n')
    );
    context.log(
        chalk.white(
            `  Documentation for creating an application is at ${chalk.yellow(
                'https://github.com/ruddell/jhipster-react-native/docs/creating-an-app/'
            )}`
        )
    );
    context.log(
        chalk.white(
            `  If you find JHipster React Native useful, consider sponsoring the project at ${chalk.yellow(
                'https://opencollective.com/generator-jhipster'
            )}`
        )
    );
    context.log(
        chalk.green(' _______________________________________________________________________________________________________________\n')
    );
};

/**
 * Get App Folders
 * @param input path to join to destination path
 * @returns {Array} array of string representing app folders
 */
function getAppFolder(input) {
    const destinationPath = this.destinationPath(input);
    const appsFolders = [];

    if (shelljs.test('-f', `${destinationPath}/.yo-rc.json`)) {
        try {
            const fileData = this.fs.readJSON(`${destinationPath}/.yo-rc.json`);
            if (fileData['generator-jhipster'].baseName !== undefined) {
                appsFolders.push(destinationPath);
            }
        } catch (err) {
            this.log(chalk.red(`The .yo-rc.json in ${destinationPath} can't be read!`));
            this.debug('Error:', err);
        }
    }

    return appsFolders;
}

module.exports = { generateReactNativeApp, printJHipsterLogo, getAppFolder };
