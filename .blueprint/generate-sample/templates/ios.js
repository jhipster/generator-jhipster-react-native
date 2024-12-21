import { fileURLToPath } from 'node:url';
import { getGithubSamplesGroup } from 'generator-jhipster/testing';

const { samples } = await getGithubSamplesGroup(fileURLToPath(new URL('./', import.meta.url)), 'samples');

export default Object.fromEntries(
  Object.entries(samples).map(([sample, spec]) => [
    sample,
    {
      ...spec,
      'docker-services': !sample.includes('oauth2'),
      ...(sample.includes('oauth2')
        ? { os: 'macos-13', 'default-environment': 'prod', 'skip-e2e': 'true' }
        : { os: 'macos-15', 'default-environment': 'dev' }),
    },
  ]),
);
