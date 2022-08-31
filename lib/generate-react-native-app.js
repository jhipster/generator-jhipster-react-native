const chalk = require('chalk');
const fse = require('fs-extra');
const dependenciesPackageJson = require('../generators/app/templates/package.json');

const expoSdkVersion = dependenciesPackageJson.devDependencies.expo;

function generateReactNativeApp() {
  const name = this.context.reactNativeAppName;
  this.info(chalk.green("Running 'npx create-expo-app', this will take some time..."));
  try {
    // remove the expected folder in case it already exists
    fse.removeSync(`${process.cwd()}/${name}/`);

    const generateCommand = `create-expo-app -t expo-template-blank-typescript@${expoSdkVersion} --no-install ${name}`;
    this.debug(generateCommand);

    // generate the expo app
    this.spawnCommandSync('npx', generateCommand.split(' '), {
      stdio: this.options.debug ? 'inherit' : 'ignore',
    });

    // collapse generated RN folder into parent folder
    const rnFiles = ['.expo-shared', '.gitignore', 'app.json', 'babel.config.js', 'package.json', 'tsconfig.json'];
    rnFiles.forEach(file => {
      this.fs.move(`${process.cwd()}/${name}/${file}`, `${process.cwd()}/${file}`, { overwrite: true });
    });
    fse.removeSync(`${process.cwd()}/${name}/`);
  } catch (e) {
    this.debug(e);
    if (process.cwd().includes('(') || process.cwd().includes(')')) {
      this.error('Project path contains parenthesis - please generate in a folder without parenthesis.');
    }
    this.error('Something went wrong generating the React Native app, please try with the --debug flag for more info.');
  }
}

module.exports = { generateReactNativeApp };
