const files = {
    common: [
        {
            templates: [
                '.prettierrc.js',
                '.editorconfig',
                '.env.example',
                '.eslintrc.js',
                '.gitattributes',
                'babel.config.js',
                'ignite.json',
                'index.js',
                'README.md',
                // templated files
                'app/config/app-config.js',
                'app/navigation/drawer/drawer-content.js',
                'app/navigation/layouts.js',
                'app/modules/home/learn-more-links.component.js',
                'app/modules/login/login-screen.js',
                'app/modules/account/register/register-screen.js',
                'app/shared/services/api.js',
                'app/modules/login/login.reducer.js',
                'test/spec/modules/login/login.reducer.spec.js',
                'app/modules/login/login.sagas.js',
                'test/spec/modules/login/login.sagas.spec.js',
                'app/shared/services/fixture-api.js',
                'app/shared/fixtures/login.json',
                'app/shared/sagas/index.js',
                'app/shared/sagas/call-api.saga.js',
                'app/shared/sagas/startup.saga.js',
                'test/spec/shared/sagas/startup.saga.spec.js',
                'test/setup.js',
                'app/shared/reducers/create-store.js',
                'fastlane/Appfile',
                'fastlane/Fastfile',
                'fastlane/Matchfile',
            ],
        },
    ],
    detox: [
        {
            condition: generator => generator.props.detox === true,
            templates: ['.detoxrc.json'],
        },
    ],
};

module.exports = { files, writeFiles };

function writeFiles() {
    this.props = {
        name: 'Test',
        detox: false,
        searchEngine: false,
        websockets: false,
        authType: 'jwt',
    };
    this.writeFilesToDisk(files, this, false);
}
