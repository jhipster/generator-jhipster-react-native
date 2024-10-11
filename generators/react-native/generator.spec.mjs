import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';
import expectedFiles from '../../test/expected-files.js';

const SUB_GENERATOR = 'react-native';
const SUB_GENERATOR_NAMESPACE = `jhipster-react-native:${SUB_GENERATOR}`;

describe('SubGenerator reactNative of reactNative JHipster blueprint', () => {
  describe('WebSocket Disabled, JWT Authentication, No Detox Test', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          websocket: 'no',
        })
        .withOptions({
          force: false,
          blueprint: ['react-native'],
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
      result.assertFile(expectedFiles.defaultApp);
      result.assertNoFile(expectedFiles.websockets);
      result.assertFile(expectedFiles.notOauth);
      result.assertNoFile(expectedFiles.oauth);
      result.assertNoFile(expectedFiles.detox);
      result.assertNoFile(expectedFiles.detoxAndWebsockets);
      result.assertNoFile(expectedFiles.detoxAndNotOauth);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });

  describe('WebSocket Enabled with Spring, JWT Authentication, No Detox Test', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          websocket: 'spring-websocket',
        })
        .withOptions({
          force: false,
          blueprint: ['react-native'],
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
      result.assertFile(expectedFiles.defaultApp);
      result.assertFile(expectedFiles.websockets);
      result.assertFile(expectedFiles.notOauth);
      result.assertNoFile(expectedFiles.oauth);
      result.assertNoFile(expectedFiles.detox);
      result.assertNoFile(expectedFiles.detoxAndWebsockets);
      result.assertNoFile(expectedFiles.detoxAndNotOauth);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });

  describe('WebSocket Enabled with Spring, OAuth2 Authentication, No Detox Test', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          websocket: 'spring-websocket',
        })
        .withOptions({
          force: false,
          blueprint: ['react-native'],
          appDir: false,
          ignoreNeedlesError: true,
          authenticationType: 'oauth2',
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
      result.assertFile(expectedFiles.defaultApp);
      result.assertFile(expectedFiles.websockets);
      result.assertNoFile(expectedFiles.notOauth);
      result.assertFile(expectedFiles.oauth);
      result.assertNoFile(expectedFiles.detox);
      result.assertNoFile(expectedFiles.detoxAndWebsockets);
      result.assertNoFile(expectedFiles.detoxAndNotOauth);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });

  describe('WebSocket Disabled, JWT Authentication, With Detox Test', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          websocket: 'no',
        })
        .withOptions({
          force: false,
          blueprint: ['react-native'],
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
      result.assertFile(expectedFiles.defaultApp);
      result.assertNoFile(expectedFiles.websockets);
      result.assertFile(expectedFiles.notOauth);
      result.assertNoFile(expectedFiles.oauth);
      result.assertFile(expectedFiles.detox);
      result.assertNoFile(expectedFiles.detoxAndWebsockets);
      result.assertFile(expectedFiles.detoxAndNotOauth);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });

  describe('WebSocket Enabled with Spring, JWT Authentication, With Detox Test', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          websocket: 'spring-websocket',
        })
        .withOptions({
          force: false,
          blueprint: ['react-native'],
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
      result.assertFile(expectedFiles.defaultApp);
      result.assertFile(expectedFiles.websockets);
      result.assertFile(expectedFiles.notOauth);
      result.assertNoFile(expectedFiles.oauth);
      result.assertFile(expectedFiles.detox);
      result.assertFile(expectedFiles.detoxAndWebsockets);
      result.assertFile(expectedFiles.detoxAndNotOauth);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });

  describe('WebSocket Enabled with Spring, OAuth2 Authentication, With Detox Test', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig({
          websocket: 'spring-websocket',
        })
        .withOptions({
          force: false,
          blueprint: ['react-native'],
          appDir: false,
          ignoreNeedlesError: true,
          authenticationType: 'oauth2',
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
      result.assertFile(expectedFiles.defaultApp);
      result.assertFile(expectedFiles.websockets);
      result.assertNoFile(expectedFiles.notOauth);
      result.assertFile(expectedFiles.oauth);
      result.assertFile(expectedFiles.detox);
      result.assertFile(expectedFiles.detoxAndWebsockets);
      result.assertNoFile(expectedFiles.detoxAndNotOauth);
      result.assertNoFile(expectedFiles.notExpected);
    });
  });
});
