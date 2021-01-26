/**
 * Copyright 2019-Present the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// https://github.com/oktadeveloper/generator-jhipster-ionic/blob/cbf8837b33629ab7a5269012eef1866059bd3ccb/generators/entity/prompts.js
const chalk = require('chalk');
const path = require('path');
const shelljs = require('shelljs');

module.exports = {
  askForBackendJson,
};

function askForBackendJson() {
  const context = this.context;
  this.context.filename = `.jhipster/${context.name}.json`;

  if (this.context.entityExisted || this.context.configExisted) {
    context.entityJSON = this.entityStorage.getAll();
    return;
  }

  if (this.options.defaults) {
    this.directoryPath = path.resolve('../backend');
    return;
  }

  const done = this.async();

  const prompts = [
    {
      when: !this.options.fromJdl,
      type: 'input',
      name: 'backendPath',
      message: 'Enter the directory where your JHipster app is located:',
      store: true,
      default: '../backend',
      validate: input => {
        let fromPath = '';
        if (path.isAbsolute(input)) {
          fromPath = `${input}/${context.filename}`;
        } else {
          fromPath = this.destinationPath(`${input}/${context.filename}`);
        }

        if (shelljs.test('-f', fromPath)) {
          return true;
        }
        return `${context.filename} not found in ${input}/`;
      },
    },
  ];

  this.prompt(prompts).then(props => {
    if (props.backendPath) {
      this.log(chalk.green(`\nFound the ${context.filename} configuration file, entity can be automatically generated!\n`));
      if (path.isAbsolute(props.backendPath)) {
        context.backendPath = props.backendPath;
      } else {
        context.backendPath = path.resolve(props.backendPath);
      }
      context.fromPath = `${context.backendPath}/${context.filename}`;
      context.appConfigFromPath = `${context.backendPath}/.yo-rc.json`;
      context.useConfigurationFile = true;

      context.entityJSON = this.fs.readJSON(context.fromPath);
      this.entityStorage.set(context.entityJSON);
    } else if (this.options.fromJdl) {
      this.log(chalk.green(`Importing entity ${context.name} from JDL!`));
      context.entityJSON = this.entityStorage.getAll();
    }
    done();
  });
}
