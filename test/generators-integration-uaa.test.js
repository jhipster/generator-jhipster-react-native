const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')
const tempy = require('tempy')

const IGNITE = 'ignite'
const APP = 'IntegrationTestUAA'
const BOILERPLATE = `${__dirname}/..`

test.before(async t => {
  await execa('npm', ['link'])
  // creates a new temp directory
  process.chdir(tempy.directory())
  console.log('Generating UAA app...')
  await execa(IGNITE, ['new', APP, '--uaa', '--skip-git', '--boilerplate', BOILERPLATE])
  process.chdir(APP)
  await execa('npm', ['link', 'ignite-jhipster'])
  console.log('App generation complete!')
})

test('lints a fresh app', async t => {
  console.log('Linting fresh app')
  const lint = await execa('npm', ['-s', 'run', 'lint'])
  t.is(lint.stderr, '')
})

test('generates an entity', async t => {
  console.log('Generating entity Foo')
  await execa(IGNITE, ['g', 'entity', 'Foo', '--jh-dir=../test'])
  await execa(IGNITE, ['g', 'entity', 'FieldTestEntity', '--jh-dir=../test'])
  console.log('Generated entities')
  // t.is(jetpack.exists('App/Components/Test.js'), 'file')
  // t.is(jetpack.exists('App/Components/Styles/TestStyle.js'), 'file')
  const lint = await execa('npm', ['-s', 'run', 'lint'])
  t.is(lint.stderr, '')
})

test('passes generated tests', async t => {
  console.log('Running Tests')
  const tests = await execa('npm', ['-s', 'run', 'test'])
  console.log('Tests Complete')
  t.notRegex(tests.stderr, /failed/)
})
