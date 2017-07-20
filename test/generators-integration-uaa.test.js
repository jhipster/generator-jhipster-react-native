const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')

const IGNITE = 'ignite'
const APP = 'IntegrationTestUAA'

test.before(async t => {
  jetpack.remove(APP)
  console.log('Generating UAA app...')
  await execa(IGNITE, ['new', APP, '--uaa', '--skip-git', '--boilerplate', `${__dirname}/..`])
  process.chdir(APP)
  console.log('App generation complete!')
})

test('generates an entity', async t => {
  console.log('Generating entity Foo')
  await execa(IGNITE, ['g', 'entity', 'Foo', '--jh-dir=../test'])
  console.log('Generated entity Foo')
  // t.is(jetpack.exists('App/Components/Test.js'), 'file')
  // t.is(jetpack.exists('App/Components/Styles/TestStyle.js'), 'file')
  const lint = await execa('npm', ['-s', 'run', 'lint'])
  t.is(lint.stderr, '')
})

test.after.always('clean up all generated items', t => {
  process.chdir('../')
  jetpack.remove(APP)
})
