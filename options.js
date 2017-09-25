/**
 * The questions to ask during the install process.
 */

const questions = {
  authType: {
    name: 'authType',
    message: 'Which JHipster Authentication does your server use?',
    type: 'radio',
    choices: ['jwt', 'oauth2', 'uaa', 'session'],
    default: 'jwt'
  },
  searchEngine: {
    name: 'searchEngine',
    message: 'Does your JHipster Application use ElasticSearch?',
    type: 'confirm',
    default: false
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
    choices: ['none', 'react-native-animatable']
  }
}

module.exports = {
  questions
}
