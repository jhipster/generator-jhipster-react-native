// This file will not be overwritten by generate-blueprint
module.exports = {
  defaultCommand: 'react-native',
  printBlueprintLogo: undefined,
  printLogo: async () => {
    const { printJHipsterLogo } = await import('./print-jhipster-logo.js');
    await printJHipsterLogo();
  },
};
