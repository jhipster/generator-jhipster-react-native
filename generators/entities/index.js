/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
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
const chalk = require('chalk');
const EntitiesGenerator = require('generator-jhipster/generators/entities');

// overriding this generator enables us to import jdl without other side-effects
module.exports = class extends EntitiesGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

    const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

    if (!jhContext) {
      console.log('No jhContext found after initializing blueprint (entities generator)');
      this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints react-native')}`);
    }
  }

  get initializing() {
    return {};
  }

  get composing() {
    return {
      composeEachEntity() {
        const context = this.context;
        this.getExistingEntityNames().forEach(entityName => {
          if (this.options.composedEntities && this.options.composedEntities.includes(entityName)) return;
          this.composeWithJHipster('jhipster-react-native:entity', {
            regenerate: true,
            skipDbChangelog: this.jhipsterConfig.databaseType === 'sql' || this.options.skipDbChangelog,
            skipInstall: true,
            arguments: [entityName],
            context,
          });
        });
      },
    };
  }

  get loading() {
    return super._loading();
  }

  get default() {
    return {};
  }

  get writing() {
    return {};
  }
};
