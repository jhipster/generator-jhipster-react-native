/**
 * @type {import('generator-jhipster').JHipsterCommandDefinition}
 */
const command = {
  options: {
    skipCommitHook: {
      desc: 'Skip adding husky commit hooks',
      type: Boolean,
      scope: 'storage',
    },
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
};

export default command;
