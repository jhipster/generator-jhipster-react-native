const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')

const IGNITE = 'ignite'
const APP = 'IntegrationTest'

test.before(async t => {
  jetpack.remove(APP)
  console.log('Generating app...')
  await execa(IGNITE, ['new', APP, '--min', '--skip-git', '--boilerplate', `${__dirname}/..`])
  process.chdir(APP)
  // for some  reason... add it again (TODO: WTF)
  console.log('App generation complete!')
  await execa(IGNITE, ['add', '../'])
})

test('generates an entity', async t => {
  await execa(IGNITE, ['g', 'entity', 'Foo'], { preferLocal: false })
  // t.is(jetpack.exists('App/Components/Test.js'), 'file')
  // t.is(jetpack.exists('App/Components/Styles/TestStyle.js'), 'file')
  const lint = await execa('npm', ['-s', 'run', 'lint'])
  t.is(lint.stderr, '')
})

test.after.always('clean up all generated items', t => {
  process.chdir('../')
  jetpack.remove(APP)
})
