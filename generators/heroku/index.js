const chalk = require('chalk');
const fs = require('fs');
const ChildProcess = require('child_process');
const util = require('util');
const HerokuGenerator = require('generator-jhipster/generators/heroku');

const execCmd = util.promisify(ChildProcess.exec);

module.exports = class extends HerokuGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint micronaut')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get initializing() {
        return {};
    }

    get prompting() {
        const { askForApp } = super._prompting();
        return {
            askForApp,
        };
    }

    get configuring() {
        const { checkInstallation } = super._configuring();
        return {
            checkInstallation,
            saveConfig() {
                this.config.set({
                    herokuAppName: this.herokuAppName,
                });
            },
        };
    }

    get default() {
        const defaultSteps = {
            copyHerokuFiles() {
                this.log(chalk.bold('\nCreating Heroku deployment files'));
                this.template('Procfile.ejs', 'Procfile');
            },
            addHerokuDependencies() {
                const packageJsonSource = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
                packageJsonSource.dependencies['http-server'] = '0.12.3';
                packageJsonSource.scripts['heroku-postbuild'] = 'npm run build:web';
                packageJsonSource.scripts['heroku-prebuild'] = 'npm install -g expo-cli http-server';
                this.fs.writeJSON('package.json', packageJsonSource);
            },
        };

        const { gitInit, installHerokuDeployPlugin, herokuCreate } = super._default();
        const { copyHerokuFiles, addHerokuDependencies } = defaultSteps;
        return {
            gitInit,
            installHerokuDeployPlugin,
            herokuCreate,
            copyHerokuFiles,
            addHerokuDependencies,
        };
    }

    get end() {
        return {
            async productionDeploy() {
                if (this.abort) return;

                try {
                    const buildpack = 'heroku/nodejs';
                    this.log(chalk.bold('\nConfiguring Heroku'));
                    await execCmd(`heroku buildpacks:add ${buildpack} --app ${this.herokuAppName}`);

                    this.log(chalk.bold('\nDeploying application'));

                    const herokuPush = execCmd('git push heroku HEAD:main', { maxBuffer: 1024 * 10000 });
                    herokuPush.child.stdout.on('data', data => {
                        this.log(data);
                    });

                    herokuPush.child.stderr.on('data', data => {
                        this.log(data);
                    });

                    await herokuPush;

                    this.log(chalk.green(`\nYour app should now be live. To view it run\n\t${chalk.bold('heroku open')}`));
                    this.log(chalk.yellow(`And you can view the logs with this command\n\t${chalk.bold('heroku logs --tail')}`));
                    this.log(chalk.yellow(`After application modification, redeploy it with\n\t${chalk.bold('git push heroku master')}`));
                } catch (err) {
                    this.log.error(err);
                }
            },
        };
    }
};
