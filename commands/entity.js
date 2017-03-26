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

    // add methods to api
    // ignite-jhipster-api-method-needle
    // ignite-jhipster-api-export-needle

    // generate a saga for the entity

    // generate a redux for the entity

    // import redux in redux/index.js
    // ignite-jhipster-redux-store-import-needle

    // import saga/redux in sagas/index.js
    // ignite-jhipster-saga-redux-import-needle
    // ignite-jhipster-saga-method-import-needle
    // ignite-jhipster-saga-redux-connect-needle

    // generate entity listing component
    // connect entity redux

    // generate entity listing screen
    // connect entity redux

    // generate entity detail component
    // connect entity redux

    // generate entity edit component
    // connect entity redux

    // add listing screen to navigation
    // ignite-jhipster-navigation-import-needle
    // ignite-jhipster-navigation-needle

    // add screen for entities, link to listings page

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
