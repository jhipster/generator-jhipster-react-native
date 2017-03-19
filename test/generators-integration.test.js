const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')
const path = require('path')

const IGNITE = 'ignite'
const APP = 'IntegrationTest'

test.before(async t => {
    jetpack.remove(APP)
    await execa(IGNITE, ['new', APP, '--min', '--skip-git', `--boilerplate=${__dirname}/../`], { env: { 'IGNITE_PLUGIN_PATH': path.resolve('../') } })
    process.chdir(APP)
    // for some  reason... add it again (TODO: WTF)
    await execa(IGNITE, ['add', '../'])
})

test('generates an entity', async t => {
    // await execa(IGNITE, ['g', 'entity', 'Foo'])
    // t.truthy(jetpack.exists('App/Components/Test.js'))
    // t.truthy(jetpack.exists('App/Components/Styles/TestStyle.js'))
    const lint = await execa('npm', ['-s', 'run', 'lint'])
    t.is(lint.stderr, '')
})

test.after.always('clean up all generated items', t => {
    process.chdir('../')
    jetpack.remove(APP)
})