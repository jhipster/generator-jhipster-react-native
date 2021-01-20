const detox = require('detox')
const config = require('../.detoxrc.json')
const adapter = require('detox/runners/mocha/adapter')

before(async () => {
  await detox.init(config, { launchApp: false });
  await device.launchApp();
})

beforeEach(async function () {
  await adapter.beforeEach(this)
})

afterEach(async function () {
  await adapter.afterEach(this)
})

after(async () => {
  await detox.cleanup()
})
