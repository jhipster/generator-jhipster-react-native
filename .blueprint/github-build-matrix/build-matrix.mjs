import { readdir } from 'fs/promises';
import { RECOMMENDED_JAVA_VERSION, RECOMMENDED_NODE_VERSION } from 'generator-jhipster';
import { fromMatrix } from 'generator-jhipster/testing';

const defaultMatrix = {
  os: ['macos-14'],
  'node-version': [RECOMMENDED_NODE_VERSION],
  'java-version': [RECOMMENDED_JAVA_VERSION],
  'default-environment': ['dev'],
};

const oauth2Sample = {
  os: 'macos-14',
  'default-environment': 'prod',
};

export const buildMatrix = async samplesFolder => {
  const samples = await readdir(samplesFolder);
  return {
    include: Object.values(
      fromMatrix({
        ...(samplesFolder === 'oauth2' ? oauth2Matrix : defaultMatrix),
        'sample-name': samples.filter(sample => !sample.includes('disabled')),
      }),
    ).map(sample => (sample['sample-name'].includes('oauth2') ? { ...sample, ...oauth2Sample } : sample)),
  };
};
