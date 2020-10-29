const fs = require('fs-extra');
const { patchInFile } = require('./patch-in-file');

function patchOauth() {
    if (this.authenticationType === 'oauth2') {
        // if the backend path exists, patch for OAuth2
        if (fs.existsSync(`${this.directoryPath}`)) {
            const keycloakConfigFile = `${this.directoryPath}src/main/docker/realm-config/jhipster-realm.json`;
            if (fs.existsSync(keycloakConfigFile)) {
                patchInFile(keycloakConfigFile, {
                    replace: '"dev.localhost.ionic:*"',
                    insert: `"dev.localhost.ionic:*", "${this.reactNativeAppName.toLowerCase()}://*"`,
                });
            }
            const isMonolith = this.applicationType === 'monolith';
            const securityConfigFile = `${this.directoryPath}/src/main/java/${this.packageFolder}/config/SecurityConfiguration.java`;
            if (isMonolith && fs.existsSync(securityConfigFile)) {
                patchInFile(securityConfigFile, {
                    replace: '.antMatchers("/api/**").authenticated()',
                    insert: '.antMatchers("/api/auth-info").permitAll()\n            .antMatchers("/api/**").authenticated()',
                });
            }
        }
        patchInFile('android/app/build.gradle', {
            before: 'applicationId',
            insert: `        manifestPlaceholders = [
          appAuthRedirectScheme: '${this.reactNativeAppName.toLowerCase()}'
        ]`,
        });

        const oauthNativeFiles = [
            {
                template: 'ios/AppDelegate.h.ejs',
                target: `ios/${this.reactNativeAppName}/AppDelegate.h`,
            },
        ];
        oauthNativeFiles.forEach(f => this.template(f.template, f.target, this));
    }
}

module.exports = {
    patchOauth,
};
