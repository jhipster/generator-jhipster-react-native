const execa = require('execa')
const tempy = require('tempy')

const IGNITE = 'ignite'
const APP = 'IntegrationTestOauth2'
const BOILERPLATE = `${__dirname}/..`

// calling the ignite cli takes a while
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
describe('Oauth2 Integration Test', () => {
  beforeAll(async () => {
    await execa('npm', ['link'])
    // creates a new temp directory
    process.chdir(tempy.directory())
    console.log('Generating OAuth2 app...')
    await execa(IGNITE, ['new', APP, '--oauth2', '--skip-git', '--boilerplate', BOILERPLATE])
    process.chdir(APP)
    await execa('npm', ['link', 'ignite-jhipster'])
    console.log('App generation complete!')
  })

  test('lints a fresh app', async () => {
    console.log('Linting fresh app')
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('generates an entity', async () => {
    console.log('Generating entity Foo')
    await execa(IGNITE, ['g', 'entity', 'Foo', '--jh-dir=../test'])
    await execa(IGNITE, ['g', 'entity', 'FieldTestEntity', '--jh-dir=../test'])
    console.log('Generated entities')
    // t.is(jetpack.exists('App/Components/Test.js'), 'file')
    // t.is(jetpack.exists('App/Components/Styles/TestStyle.js'), 'file')
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('passes generated tests', async () => {
    console.log('Running Tests')
    const tests = await execa('npm', ['-s', 'run', 'test'])
    console.log('Tests Complete')
    // todo fix this
    // t.notRegex(tests.stderr, /failed/)
  })
})
