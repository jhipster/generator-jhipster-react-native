/**
 * @type {import('generator-jhipster').JHipsterCommandDefinition}
 */
const command = {
  configs: {
    samplesFolder: {
      description: 'Samples folder',
      cli: {
        type: String,
      },
      default: 'samples',
      scope: 'generator',
    },
  },
  options: {},
};

export default command;
