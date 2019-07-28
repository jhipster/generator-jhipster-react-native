const execa = require('execa')
const tempy = require('tempy')

const APP = 'IntegrationApp'
const BOILERPLATE = `${__dirname}/..`
const testFolder = `${__dirname}`

const copyFilesAndGenerateApp = async (authType, useDto) => {
  // creates a new temp directory
  process.chdir(tempy.directory())
  console.log('Generating app...')

  // create a dummy jhipster backend
  await execa('mkdir', ['backend'])
  await execa('mkdir', ['backend/.jhipster'])
  await execa('cp', [`${testFolder}/.jhipster/${authType}-yo-rc.json`, 'backend/.yo-rc.json'])
  await execa('cp', [`${testFolder}/jdl/entities${useDto ? '-dto' : ''}.jdl`, 'backend/backend.jdl'])
  await execa('cp', [`${testFolder}/.jhipster/FieldTestEntity.json`, 'backend/.jhipster/FieldTestEntity.json'])

  const generationLog = await execa('ignite', [
    'new', APP,
    '--jh-dir=backend',
    '--skip-git',
    '--disable-insight',
    '--detox=false',
    '--boilerplate', BOILERPLATE
  ])
  console.log(generationLog.stdout)
  process.chdir(APP)
}

const generateEntities = async () => {
  const linkingLog = await execa('yarn', ['link', 'ignite-jhipster'])
  console.log(linkingLog.stdout)
  console.log('Generating entities...')
  await execa('ignite', ['g', 'entity', 'FieldTestEntity', '--jh-dir=../backend'])
  const jdlGenerationLog = await execa('ignite', ['g', 'import-jdl', '../backend/backend.jdl'])
  console.log(jdlGenerationLog.stdout)
  expect(jdlGenerationLog.stderr).toBe('')

  // todo validate expected files

  await lintBoilerplate()
}

const lintBoilerplate = async () => {
  console.log('Linting app')
  const lint = await execa('npm', ['-s', 'run', 'lint'])
  expect(lint.stderr).toBe('')
}

const runTests = async () => {
  console.log('Running Tests')
  const tests = await execa('npm', ['-s', 'run', 'test', '--', '-u'])
  console.log('Tests Complete')
  console.log(tests.stdout)
  expect(tests.stderr).not.toMatch(/failed/)
}

module.exports = {
  copyFilesAndGenerateApp,
  lintBoilerplate,
  generateEntities,
  runTests
}
