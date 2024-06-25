import fs from 'fs';
import ChildProcess from 'child_process';
import util from 'util';
import chalk from 'chalk';
import HerokuGenerator from 'generator-jhipster/generators/heroku';

const execCmd = util.promisify(ChildProcess.exec);

export default class extends HerokuGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

    const jhContext = this.options.jhipsterContext;
    this.jhipsterContext = jhContext;

    if (!jhContext) {
      console.log('No jhContext found after initializing blueprint (heroku generator)');
      // this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints react-native')}`);
    }

    this.configOptions = {};
    if (jhContext && jhContext.configOptions) {
      this.configOptions = jhContext.configOptions;
    }
  }

  get [HerokuGenerator.INITIALIZING]() {
    return super._initializing();
  }

  get prompting() {
    // todo replace with main generator prompt once PR to fix existing app is in
    // const { askForApp } = super._prompting();
    return {
      askForApp() {
        const done = this.async();

        if (this.herokuAppName) {
          ChildProcess.exec(`heroku apps:info --json ${this.herokuAppName}`, (err, stdout) => {
            if (err) {
              this.abort = true;
              this.log.error(`Could not find application: ${chalk.cyan(this.herokuAppName)}`);
              this.log.error('Run the generator again to create a new application.');
              this.herokuAppName = null;
            } else {
              const json = JSON.parse(stdout);
              this.herokuAppName = json.app.name;
              if (json.dynos.length > 0) {
                this.dynoSize = json.dynos[0].size;
              }
              this.log(`Deploying as existing application: ${chalk.bold(this.herokuAppName)}`);
              this.herokuAppExists = true;
              this.config.set({
                herokuAppName: this.herokuAppName,
                herokuDeployType: this.herokuDeployType,
              });
            }
            done();
          });
        } else {
          const prompts = [
            {
              type: 'input',
              name: 'herokuAppName',
              message: 'Name to deploy as:',
              default: this.baseName,
            },
            {
              type: 'list',
              name: 'herokuRegion',
              message: 'On which region do you want to deploy ?',
              choices: ['us', 'eu'],
              default: 0,
            },
          ];

          this.prompt(prompts).then(props => {
            this.herokuAppName = this._.kebabCase(props.herokuAppName);
            this.herokuRegion = props.herokuRegion;
            this.herokuAppExists = false;
            done();
          });
        }
      },
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
        packageJsonSource.dependencies['http-server'] = '14.1.1';
        packageJsonSource.scripts['heroku-prebuild'] = 'npm install -g sharp-cli http-server gzipper generator-jhipster-react-native';
        packageJsonSource.scripts['heroku-postbuild'] = 'npm run build:web && gzipper compress ./dist --brotli';
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
      npmInstall() {
        if (!this.options.skipInstall) {
          this.log(chalk.bold('\nInstalling dependencies to ensure lock files match package.json'));
          this.spawnCommandSync('npm', ['i']);
        }
      },
      async productionDeploy() {
        if (this.abort || this.herokuSkipDeploy) return;

        try {
          this.log(chalk.bold('\nUpdating Git repository'));
          const gitAddCmd = 'git add .';
          this.log(chalk.cyan(gitAddCmd));

          const gitAdd = execCmd(gitAddCmd);
          gitAdd.child.stdout.on('data', data => {
            this.log(data);
          });

          gitAdd.child.stderr.on('data', data => {
            this.log(data);
          });
          await gitAdd;

          const gitCommitCmd = 'git commit -m "Deploy to Heroku" --allow-empty';
          this.log(chalk.cyan(gitCommitCmd));

          const gitCommit = execCmd(gitCommitCmd);
          gitCommit.child.stdout.on('data', data => {
            this.log(data);
          });

          gitCommit.child.stderr.on('data', data => {
            this.log(data);
          });
          await gitCommit;

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
}
