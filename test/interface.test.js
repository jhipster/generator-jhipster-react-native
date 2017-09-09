const boilerplate = require('../boilerplate')

test('boilerplate interface', async () => {
  expect(typeof boilerplate.install).toBe('function')
})
