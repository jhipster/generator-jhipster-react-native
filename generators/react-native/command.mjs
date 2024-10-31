import { asCommand } from 'generator-jhipster';

export default asCommand({
  configs: {
    detox: {
      description: 'Generate Detox tests',
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
