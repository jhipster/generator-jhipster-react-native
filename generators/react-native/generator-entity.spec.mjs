import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';
import expectedFiles from '../../test/expected-files.js';

const SUB_GENERATOR = 'react-native';
const SUB_GENERATOR_NAMESPACE = `jhipster-react-native:${SUB_GENERATOR}`;

describe('SubGenerator reactNative of reactNative JHipster blueprint', () => {
  describe('Entity Test: Search Engine Disabled, No Detox', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig(
          {
            websocket: 'no',
            searchEngine: 'no',
          },
          [
            {
              name: 'Foo',
              changelogDate: '20201110205443',
              fields: [
                {
                  fieldName: 'name',
                  fieldType: 'String',
                },
              ],
            },
          ],
        )
        .withOptions({
          force: false,
          blueprint: 'react-native',
          appDir: false,
          ignoreNeedlesError: true,
          authenticationType: 'jwt',
        })
        .withAnswers({
          detox: false,
        })
        .withJHipsterLookup()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('it generates the expected files', () => {
      result.assertFile(expectedFiles.entity);
      result.assertNoFile(expectedFiles.entityDetox);
      result.assertNoFile(expectedFiles.entitySearchEngine);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });

  describe('Entity Test: Search Engine Disabled, Detox Enabled', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig(
          {
            websocket: 'no',
            searchEngine: 'no',
          },
          [
            {
              name: 'Foo',
              changelogDate: '20201110205443',
              fields: [
                {
                  fieldName: 'name',
                  fieldType: 'String',
                },
              ],
            },
          ],
        )
        .withOptions({
          force: false,
          blueprint: 'react-native',
          appDir: false,
          ignoreNeedlesError: true,
          authenticationType: 'jwt',
        })
        .withAnswers({
          detox: true,
        })
        .withJHipsterLookup()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('it generates the expected files', () => {
      result.assertFile(expectedFiles.entity);
      result.assertFile(expectedFiles.entityDetox);
      result.assertNoFile(expectedFiles.entitySearchEngine);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });

  describe('Entity Test: Search Engine and Detox Enabled', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig(
          {
            websocket: 'no',
            searchEngine: 'eleasticsearch',
          },
          [
            {
              name: 'Foo',
              changelogDate: '20201110205443',
              fields: [
                {
                  fieldName: 'name',
                  fieldType: 'String',
                },
              ],
            },
          ],
        )
        .withOptions({
          force: false,
          blueprint: 'react-native',
          appDir: false,
          ignoreNeedlesError: true,
          authenticationType: 'jwt',
        })
        .withAnswers({
          detox: true,
        })
        .withJHipsterLookup()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('it generates the expected files', () => {
      result.assertFile(expectedFiles.entity);
      result.assertFile(expectedFiles.entityDetox);
      result.assertFile(expectedFiles.entitySearchEngine);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });
});
