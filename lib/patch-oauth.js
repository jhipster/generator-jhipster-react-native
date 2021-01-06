const fs = require('fs-extra');

// disabled this method
// the redirect URI with expo includes the expo login which isn't guaranteed to be available for new expo users
// the patch also does not happen when an app is generated via JDL
function patchOauth() {
    // if (this.authenticationType === 'oauth2') {
    //     // if the backend path exists, patch for OAuth2
    //     if (fs.existsSync(`${this.directoryPath}`)) {
    //         const keycloakConfigFile = `${this.directoryPath}src/main/docker/realm-config/jhipster-realm.json`;
    //         if (fs.existsSync(keycloakConfigFile)) {
    //             this.patchInFile(keycloakConfigFile, {
    //                 replace: '"dev.localhost.ionic:*"',
    //                 insert: `"dev.localhost.ionic:*", "${this.context.reactNativeAppName.toLowerCase()}://*", "https://auth.expo.io/@replace-with-your-expo-username/${this.context.reactNativeAppName}"`,
    //             });
    //         }
    //     }
    // }
}

module.exports = {
    patchOauth,
};
