const boilerplate = require('../boilerplate')

test('boilerplate interface', () => {
  expect(typeof boilerplate.install).toBe('function')
})
