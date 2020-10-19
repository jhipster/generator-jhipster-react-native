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
// Modified Version of:
// https://github.com/jhipster/generator-jhipster/blob/355fb16ea2d5feb08408083f1aaddfdb13bc461c/generators/generator-base.js#L262-L294
/**
 * Replace packageJsonWithTemplatedVersions with versions from packageJsonWithVersionsFile.
 */
const replacePackageJsonVersions = async (context, packageJsonWithTemplatedVersions, packageJsonWithVersionsFile) => {
  try {
    const fs = require('fs-extra')
    const packageJsonWithVersions = await fs.readJSON(packageJsonWithVersionsFile)
    const replace = section => {
      if (packageJsonWithTemplatedVersions[section]) {
        Object.entries(packageJsonWithTemplatedVersions[section]).forEach(([dependency, dependencyReference]) => {
          if (dependencyReference.startsWith('REPLACE_WITH_VERSION')) {
            const [
              keyToReplaceAtSource,
              sectionAtSource = section,
              dependencyAtSource = dependency,
            ] = dependencyReference.split('#')
            if (keyToReplaceAtSource !== 'REPLACE_WITH_VERSION') return
            if (!packageJsonWithVersions[sectionAtSource] || !packageJsonWithVersions[sectionAtSource][dependencyAtSource]) {
              throw new Error(
                `Error setting ${dependencyAtSource} version, not found at ${sectionAtSource}.${dependencyAtSource}`
              )
            }
            packageJsonWithTemplatedVersions[section][dependency] = packageJsonWithVersions[sectionAtSource][dependencyAtSource]
          }
        })
      }
    }
    replace('dependencies')
    replace('devDependencies')
    return packageJsonWithTemplatedVersions
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  replacePackageJsonVersions,
}
