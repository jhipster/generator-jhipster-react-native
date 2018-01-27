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
    }
  },
  devScreens: {
    name: 'devScreens',
    message: 'Would you like Ignite Development Screens?',
    type: 'confirm'
  },
  // i18n: {
  //   name: 'i18n',
  //   message: 'What internationalization library will you use?',
  //   type: 'list',
  //   choices: ['none', 'react-native-i18n']
  // },
  animatable: {
    name: 'animatable',
    message: 'What animation library will you use?',
    type: 'radio',
    choices: ['react-native-animatable']
  },
  insight: {
    name: 'insight',
    message: 'May IgniteJHipster anonymously report usage statistics to improve the tool over time?',
    type: 'confirm'
  }
}
