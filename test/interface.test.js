const test = require('ava')
const boilerplate = require('../boilerplate')

test('boilerplate interface', async t => {
  t.is(typeof boilerplate.install, 'function')
})
