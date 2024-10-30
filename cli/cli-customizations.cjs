// This file will not be overwritten by generate-blueprint
module.exports = {
  defaultCommand: 'app',
  printBlueprintLogo: undefined,
  printLogo: async () => {
    const { printJHipsterLogo } = await import('./print-jhipster-logo.js');
    await printJHipsterLogo();
  }
};
