const execa = require('execa')
const tempy = require('tempy')

const IGNITE = 'ignite'
const APP = 'IntegrationTest'
const BOILERPLATE = `${__dirname}/..`
const testFolder = `${__dirname}`

// calling the ignite cli takes a while
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('UAA Integration Test', () => {
  beforeAll(async () => {
    // creates a new temp directory
    process.chdir(tempy.directory())
    console.log('Generating app...')

    // create a dummy jhipster backend
    await execa('mkdir', ['backend'])
    await execa('cp', [`${testFolder}/.jhipster/uaa-yo-rc.json`, 'backend/.yo-rc.json'])

    await execa(IGNITE, [
      'new', APP,
      '--jh-dir=backend',
      '--skip-git',
      '--disable-insight',
      '--boilerplate', BOILERPLATE
    ])
    process.chdir(APP)
    console.log('App generation complete!')
  })

  test('lints a fresh app', async () => {
    console.log('Linting fresh app')
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    expect(lint.stderr).toBe('')
  })

  test('generates two entities', async () => {
    console.log('Generating entities...')
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
    const tests = await execa('npm', ['-s', 'run', 'test', '--', '-u'])
    console.log('Tests Complete')
    expect(tests.stderr).not.toMatch(/failed/)
  })
})
