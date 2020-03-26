/**
 * The prompts to ask during the install process.
 */

module.exports = {
  jhipsterPath: {
    name: 'filePath',
    message: 'Enter the path to your JHipster project root directory:',
    type: 'input',
    store: true,
    default: 'backend',
    validate: function (resp) {
      if (resp === '' || resp === undefined) {
        console.log('Path is required')
        return false
      }
      return true
    },
  },
  // i18n: {
  //   name: 'i18n',
  //   message: 'What internationalization library will you use?',
  //   type: 'list',
  //   choices: ['none', 'react-native-i18n']
  // },
  detox: {
    name: 'detox',
    message: 'Do you want to enable end-to-end tests with Detox?',
    type: 'confirm',
  },
  insight: {
    name: 'insight',
    message: 'May IgniteJHipster anonymously report usage statistics to improve the tool over time?',
    type: 'confirm',
  },
}
