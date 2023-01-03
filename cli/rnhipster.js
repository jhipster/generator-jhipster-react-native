#!/usr/bin/env node
/**
 * Copyright 2017-2022 the original author or authors from the JHipster project.
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
const semver = require('semver');
const { logger } = require('generator-jhipster/cli/utils');
const packageJson = require('../package.json');

const currentNodeVersion = process.versions.node;
const minimumNodeVersion = packageJson.engines.node;

if (!semver.satisfies(currentNodeVersion, minimumNodeVersion)) {
  /* eslint-disable no-console */
  logger.error(
    `You are running Node version ${currentNodeVersion}\nRNHipster requires Node version ${minimumNodeVersion}\nPlease update your version of Node.`
  );
  /* eslint-enable  */
}

// Pass in react-native as a blueprint module.
// User passes in blueprints flag but without react-native :> append react-native
if (!process.argv.includes('react-native') && process.argv.includes('--blueprints')) {
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--blueprints') {
      process.argv[i + 1] = `${process.argv[i + 1].split(',')},react-native`;
    }
  }
  // User passes in blueprint flag but without react-native :> append react-native
} else if (!process.argv.includes('react-native') && process.argv.includes('--blueprint')) {
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--blueprint') {
      process.argv[i] = '--blueprints';
      process.argv[i + 1] = `${process.argv[i + 1]},react-native`;
    }
  }
  // User donot pass in blueprints or blueprint flag but without react-native :> append react-native
} else if (!process.argv.includes('react-native') && !process.argv.includes('--blueprint') && !process.argv.includes('--blueprints')) {
  process.argv.push('--blueprints');
  process.argv.push('react-native');
}

/* eslint-disable */
// load JHipster from generator-jhipster-react-native dependencies - uses the version specified in package.json
const jhipsterPackageJson = require('generator-jhipster/package.json');
const packageFrom = jhipsterPackageJson._from;
logger.info('Using JHipster version installed in React Native');
logger.info(`From: ${packageFrom}`);
require('generator-jhipster/cli/cli.js');
/* eslint-enable  */
