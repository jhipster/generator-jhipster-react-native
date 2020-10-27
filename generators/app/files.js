const files = {
    common: [
        {
            templates: [
                '.editorconfig',
                '.env.example',
                '.eslintrc.js',
                '.gitattributes',
                '.prettierrc.js',
                'babel.config.js',
                'ignite.json',
                'index.js',
                'README.md',
            ],
        },
        {
            condition: generator => generator.props.detox === true,
            templates: ['.detoxrc.json'],
        },
    ],
};

// const files = [
//     // { template: 'index.js.ejs', target: 'index.js' },
//     // { template: '.eslintrc.js', target: '.eslintrc.js' },
//     // { template: '.prettierrc.js', target: '.prettierrc.js' },
//     // { template: 'README.md', target: 'README.md' },
//     // { template: 'ignite.json.ejs', target: 'ignite/ignite.json' },
//     // { template: '.editorconfig', target: '.editorconfig' },
//     // { template: 'babel.config.js', target: 'babel.config.js' },
//     // { template: '.env.example', target: '.env.example' },
//     {
//         template: 'app/config/app-config.js.ejs',
//         target: 'app/config/app-config.js',
//     },
//     {
//         template: 'app/navigation/drawer/drawer-content.js.ejs',
//         target: 'app/navigation/drawer/drawer-content.js',
//     },
//     {
//         template: 'app/navigation/layouts.js.ejs',
//         target: 'app/navigation/layouts.js',
//     },
//     {
//         template: 'app/modules/home/learn-more-links.component.js.ejs',
//         target: 'app/modules/home/learn-more-links.component.js',
//     },
//     {
//         template: 'app/modules/login/login-screen.js.ejs',
//         target: 'app/modules/login/login-screen.js',
//     },
//     {
//         template: 'app/modules/account/register/register-screen.js.ejs',
//         target: 'app/modules/account/register/register-screen.js',
//     },
//     {
//         template: 'app/shared/services/api.js.ejs',
//         target: 'app/shared/services/api.js',
//     },
//     {
//         template: 'app/modules/login/login.reducer.js.ejs',
//         target: 'app/modules/login/login.reducer.js',
//     },
//     {
//         template: 'test/spec/modules/login/login.reducer.spec.js.ejs',
//         target: 'test/spec/modules/login/login.reducer.spec.js',
//     },
//     {
//         template: 'app/modules/login/login.sagas.js.ejs',
//         target: 'app/modules/login/login.sagas.js',
//     },
//     {
//         template: 'test/spec/modules/login/login.sagas.spec.js.ejs',
//         target: 'test/spec/modules/login/login.sagas.spec.js',
//     },
//     {
//         template: 'app/shared/services/fixture-api.js.ejs',
//         target: 'app/shared/services/fixture-api.js',
//     },
//     {
//         template: 'app/shared/fixtures/login.json.ejs',
//         target: 'app/shared/fixtures/login.json',
//     },
//     {
//         template: 'app/shared/sagas/index.js.ejs',
//         target: 'app/shared/sagas/index.js',
//     },
//     {
//         template: 'app/shared/sagas/call-api.saga.js.ejs',
//         target: 'app/shared/sagas/call-api.saga.js',
//     },
//     {
//         template: 'app/shared/sagas/startup.saga.js.ejs',
//         target: 'app/shared/sagas/startup.saga.js',
//     },
//     {
//         template: 'test/spec/shared/sagas/startup.saga.spec.js.ejs',
//         target: 'test/spec/shared/sagas/startup.saga.spec.js',
//     },
//     {
//         template: 'test/setup.js.ejs',
//         target: 'test/setup.js',
//     },
//     {
//         template: 'app/shared/reducers/create-store.js.ejs',
//         target: 'app/shared/reducers/create-store.js',
//     },
//     {
//         template: 'fastlane/Appfile.ejs',
//         target: 'fastlane/Appfile',
//     },
//     {
//         template: 'fastlane/Fastfile.ejs',
//         target: 'fastlane/Fastfile',
//     },
//     {
//         template: 'fastlane/Matchfile.ejs',
//         target: 'fastlane/Matchfile',
//     },
//     { condition: false, template: '.detoxrc.json', target: '.detoxrc.json' }
// ];

module.exports = { files, writeFiles };

function writeFiles() {
    this.props = {
        name: 'Test',
        detox: false,
    };
    // write angular 2.x and above files
    const f = this.writeFilesToDisk(files, this, false, '');
    this.template('README.md.ejs', `${process.cwd()}/README.md`);
    console.log(f);
}
