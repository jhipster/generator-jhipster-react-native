const commonMethods = require('./common-methods')

// calling the ignite cli takes a while
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('JWT Auth Integration Test', () => {
  const authType = 'jwt'
  const useDto = true

  test('generates a new app', () => commonMethods.copyFilesAndGenerateApp(authType, useDto))

  test('lints a fresh app', commonMethods.lintBoilerplate)

  test('generates two entities', commonMethods.generateEntities)

  test('passes generated tests', commonMethods.runTests)
})
