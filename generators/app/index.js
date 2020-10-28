/* eslint-disable consistent-return */
const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const path = require('path');
const shelljs = require('shelljs');
const utils = require('./utils');
const patch = require('./patch-in-file');
const writeFiles = require('./files').writeFiles;

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint react-native')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get initializing() {
        utils.printJHipsterLogo(this);
        /**
         * Any method beginning with _ can be reused from the superclass `AppGenerator`
         *
         * There are multiple ways to customize a phase from JHipster.
         *
         * 1. Let JHipster handle a phase, blueprint doesnt override anything.
         * ```
         *      return super._initializing();
         * ```
         *
         * 2. Override the entire phase, this is when the blueprint takes control of a phase
         * ```
         *      return {
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *          myAnotherCustomInitPhaseStep(){
         *              // Do all your stuff here
         *          }
         *      };
         * ```
         *
         * 3. Partially override a phase, this is when the blueprint gets the phase from JHipster and customizes it.
         * ```
         *      const phaseFromJHipster = super._initializing();
         *      const myCustomPhaseSteps = {
         *          displayLogo() {
         *              // override the displayLogo method from the _initializing phase of JHipster
         *          },
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *      }
         *      return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
         * ```
         */
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return super._initializing();
        return {};
    }

    get prompting() {
        // const done = this.async();
        // const prompts = [
        //     {
        //         type: 'input',
        //         name: 'appName',
        //         message: 'What do you want to name your React Native application?',
        //         default: 'RnApp',
        //     },
        //     {
        //         type: 'input',
        //         name: 'directoryPath',
        //         message: 'Enter the directory where your JHipster app is located:',
        //         default: 'backend',
        //         validate: input => {
        //             const path = this.destinationPath(input);
        //             if (shelljs.test('-d', path)) {
        //                 const appsFolders = utils.getAppFolder.call(this, input);
        //                 if (appsFolders.length === 0) {
        //                     return `No application found in ${path}`;
        //                 }
        //                 return true;
        //             }
        //             return `${path} is not a directory or doesn't exist`;
        //         },
        //     },
        // ];
        // this.prompt(prompts).then(props => {
        //     this.ionicAppName = props.appName;
        //     this.directoryPath = path.resolve(props.directoryPath);
        //     done();
        // });
        // return super._prompting();
        return {};
    }

    get configuring() {
        console.warn('Configuring...');
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return super._configuring();
        return {};
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return super._default();
        return {};
    }

    get writing() {
        return {
            generateReactNativeApp() {
                console.log('Generating React Native app...');
                // utils.generateReactNativeApp(this);
                console.log('React Native app generated!');
            },
            writeFiles() {
                console.log('Copying Boilerplate Files...');
                writeFiles.call(this);
                console.log('Boilerplate Files Copied!');
            },
        };
    }

    get install() {
        const gitInit = super._install().initGitRepo.bind(this);
        return {
            npmInstall() {
                // todo
            },
            podInstall() {
                // todo
            },
            gitInit,
        };
    }

    get end() {
        const gitCommit = super._end().gitCommit.bind(this);
        return {
            gitCommit,
        };
    }
};
