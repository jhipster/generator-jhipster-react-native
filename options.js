/**
 * The questions to ask during the install process.
 */

const jhipsterQuestions = [
  {
    name: 'auth-type',
    message: 'Which JHipster Authentication does your server use?',
    type: 'list',
    choices: ['jwt', 'oauth2', 'uaa']
  }
]

const pluginQuestions = [
  {
    name: 'dev-screens',
    message: 'Would you like Ignite Development Screens?',
    type: 'list',
    choices: ['No', 'Yes']
  },
  {
    name: 'vector-icons',
    message: 'What vector icon library will you use?',
    type: 'list',
    choices: ['none', 'react-native-vector-icons']
  },
  // {
  //   name: 'i18n',
  //   message: 'What internationalization library will you use?',
  //   type: 'list',
  //   choices: ['none', 'react-native-i18n']
  // },
  {
    name: 'animatable',
    message: 'What animation library will you use?',
    type: 'list',
    choices: ['none', 'react-native-animatable']
  }
]

/**
 * The max preset.
 */
const max = {
  'auth-type': 'jwt',
  'dev-screens': 'Yes',
  'vector-icons': 'react-native-vector-icons',
  'i18n': 'none',
  'animatable': 'react-native-animatable'
}

/**
 * The min preset.
 */
const min = {
  'auth-type': 'jwt',
  'dev-screens': 'No',
  'vector-icons': 'none',
  'i18n': 'none',
  'animatable': 'none'
}

module.exports = {
    jhipsterQuestions,
    pluginQuestions,
  answers: { min, max }
}
