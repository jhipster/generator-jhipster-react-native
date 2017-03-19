// @cliDescription  Generates an entity component, redux, saga, api, listings, styles, and optional tests.

module.exports = async function (context) {
    // grab some features
    const { parameters, strings, print, ignite } = context
    const { pascalCase, isBlank } = strings
    const config = ignite.loadIgniteConfig()
    const { tests } = config

    // validation
    if (isBlank(parameters.first)) {
        print.info(`${context.runtime.brand} generate entity <name>\n`)
        print.info('A name is required.')
        return
    }

    // read some configuration
    const name = pascalCase(parameters.first)
    const props = { name }
    const jobs = [
        // component jobs
        {
            template: 'component.ejs',
            target: `App/Components/${name}.js`
        },
        {
            template: 'component-style.ejs',
            target: `App/Components/Styles/${name}Style.js`
        },
        // screen jobs
        {
            template: `screen.ejs`,
            target: `App/Containers/${name}Screen.js`
        },
        {
            template: `saga.ejs`,
            target: `App/Containers/Styles/${name}ScreenStyle.js`
        },

        // saga jobs
        {
            template: `saga.ejs`,
            target: `App/Sagas/${name}Sagas.js`
        },
        // redux jobs
        {
            template: `redux.ejs`,
            target: `App/Redux/${name}Redux.js`
        },

        // listview jobs
        {
            template: `listview.ejs`,
            target: `App/Containers/${name}.js`
        },
        {
            template: `listview-style.ejs`,
            target: `App/Containers/Styles/${name}Style.js`
        }
    ]

    if (tests) {
        // component tests
        if (tests === 'ava') {
            jobs.push({
                template: 'component-test.ejs',
                target: `Test/Components/${name}Test.js`
            })
        }
        // saga tests
        jobs.push({
            template: `saga-test-${tests}.ejs`,
            target: `Tests/Saga/${name}SagaTest.js`
        })
        // redux tests
        jobs.push({
            template: `redux-test-${config.tests}.ejs`,
            target: `Tests/Redux/${name}ReduxTest.js`
        })
    }

    await ignite.copyBatch(context, jobs, props)

}
