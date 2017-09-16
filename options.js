/**
 * The questions to ask during the install process.
 */

const jhipsterQuestions = [
  {
    name: 'authType',
    message: 'Which JHipster Authentication does your server use?',
    type: 'radio',
    choices: ['jwt', 'oauth2', 'uaa'],
    default: 'jwt'
  },
  {
    name: 'searchEngine',
    message: 'Does your JHipster Application use ElasticSearch?',
    type: 'confirm',
    default: false
  }
]

const pluginQuestions = [
  {
    name: 'devScreens',
    message: 'Would you like Ignite Development Screens?',
    type: 'confirm'
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
    type: 'radio',
    choices: ['none', 'react-native-animatable']
  }
]

/**
 * The max preset.
 */
const max = {
  'authType': 'jwt',
  'devScreens': true,
  'i18n': 'none',
  'searchEngine': true,
  'animatable': 'react-native-animatable'
}

/**
 * The min preset.
 */
const min = {
  'authType': 'jwt',
  'devScreens': false,
  'i18n': 'none',
  'searchEngine': false,
  'animatable': 'none'
}

/**
 * The jwt preset.
 */
const jwt = {
  'authType': 'jwt',
  'devScreens': false,
  'i18n': 'none',
  'searchEngine': false,
  'animatable': 'none'
}

/**
 * The jwt preset.
 */
const searchEngine = {
  'authType': 'jwt',
  'devScreens': false,
  'i18n': 'none',
  'searchEngine': true,
  'animatable': 'none'
}

/**
 * The uaa preset.
 */
const uaa = {
  'authType': 'uaa',
  'devScreens': false,
  'i18n': 'none',
  'searchEngine': false,
  'animatable': 'none'
}

/**
 * The oauth2 preset.
 */
const oauth2 = {
  'authType': 'oauth2',
  'devScreens': false,
  'i18n': 'none',
  'searchEngine': false,
  'animatable': 'none'
}

module.exports = {
  jhipsterQuestions,
  pluginQuestions,
  answers: { min, max, jwt, uaa, oauth2, searchEngine }
}
