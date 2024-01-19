import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'reactNative';
const SUB_GENERATOR_NAMESPACE = `jhipster-reactNative:${SUB_GENERATOR}`;

const expectedJwtFiles = [
  'src/app/services/auth/auth-jwt.service.ts',
  'src/app/services/auth/auth-jwt.service.spec.ts',
  'src/app/interceptors/auth-expired.interceptor.ts',
];

describe('SubGenerator reactNative of reactNative JHipster blueprint', () => {
  describe('with jwt authentication', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig()
        .withOptions({
          blueprint: 'reactNative',
          appDir: false,
          baseName: 'jhipster',
          ignoreNeedlesError: true,
          authenticationType: 'jwt',
        })
        .withJHipsterLookup()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('should generate app/services/auth/auth-jwt.service.ts', () => {
      result.assertFile(expectedJwtFiles);
    });
  });
  describe('with oauth2 authentication', () => {
    beforeAll(async function () {
      await helpers
        .run(SUB_GENERATOR_NAMESPACE)
        .withJHipsterConfig()
        .withOptions({
          blueprint: 'reactNative',
          appDir: false,
          baseName: 'jhipster',
          authenticationType: 'oauth2',
          ignoreNeedlesError: true,
        })
        .withJHipsterLookup()
        .withParentBlueprintLookup();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('should not generate jwt files', () => {
      result.assertNoFile(expectedJwtFiles);
    });
  });
});
