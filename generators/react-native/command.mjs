import { asCommand } from 'generator-jhipster';
import { DEFAULT_ENABLE_DETOX } from '../constants.mjs';

export default asCommand({
  configs: {
    detox: {
      description: 'Generate Detox tests',
      prompt: {
        name: 'detox',
        type: 'confirm',
        message: 'Do you want to enable end-to-end tests with Detox?',
        default: DEFAULT_ENABLE_DETOX,
      },
      scope: 'blueprint',
    },
  },
  options: {
    defaults: {
      desc: 'Use default options',
      type: String,
    },
    authenticationType: {
      desc: 'Authentication type',
      type: String,
    },
    baseName: {
      desc: 'Base name',
      type: String,
    },
    appDir: {
      desc: 'Directory for JHipster application',
      type: String,
    },
    standalone: {
      desc: 'Skip backend',
      type: Boolean,
    },
  },
  import: ['jhipster:git'],
});
