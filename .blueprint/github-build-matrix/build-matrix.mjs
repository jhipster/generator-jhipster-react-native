import { RECOMMENDED_JAVA_VERSION, RECOMMENDED_NODE_VERSION } from 'generator-jhipster';
import { fromMatrix } from 'generator-jhipster/testing';

const defaultMatrix = {
  os: ['ubuntu-latest'],
  'node-version': [RECOMMENDED_NODE_VERSION],
  'java-version': [RECOMMENDED_JAVA_VERSION],
  'default-environment': ['prod'],
};

export const buildMatrix = ({ samples, samplesFolder }) => {
  return {
    include: Object.values(
      fromMatrix({
        ...defaultMatrix,
        'sample-name': samples,
      }),
    ).map(sample => ({
      ...sample,
      'job-name': sample['sample-name'],
      'extra-args': `--samples-folder ${samplesFolder}`,
    })),
  };
};
