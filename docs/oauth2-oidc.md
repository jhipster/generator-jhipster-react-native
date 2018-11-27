## OAuth2 OIDC

For iOS support, you must follow [the setup instructions for react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth#ios-setup).  The Carthage method is recommended unless you plan on using Cocoapods (using Cocoapods can complicate linking of native dependencies).

Install Carthage if needed:
```
brew install carthage
```
Build AppAuth-iOS native library:
```
cd ios
echo 'github "openid/AppAuth-iOS" "master"' >> Cartfile
carthage update --platform iOS
cd ..
```

Make sure `react-native-app-auth` is found under the header search paths.  In XCode, look under your project's `Build Settings` -> `Header Search Path`.  If not, run `react-native link react-native-app-auth` from the root of your project.

Ignite JHipster generates several files in your JHipster backend's folder.  See the changes in your JHipster app.
- `web.rest.AuthInfoResource`
  - Adds an API endpoint returning OAuth2 issuer information
- `config.ResourceServerConfiguration.java` 
  - Enables authentication using a Bearer token instead of a cookie
- `src/main/docker/realm-config/jhipster-realm.json`
  - Adds your app's url scheme as an authorized redirect URI for the Keycloak docker container

**Note:** If you generate your Ignite JHipster app from a JDL Application, you will need to make these changes manually.
   
### URL Scheme
The app's URL scheme is declared in AppConfig, build.gradle, AndroidManifest.xml, and Info.plist.  By default it uses your app name.

#### Keycloak + Okta Configuration
Add the URL scheme from above as a valid redirect URI, followed by the word "authorize".  For example, if your URL scheme is `oauth-app` then the redirect URI
 should look like `oauth-app://authorize`.  This is patched in JHipster's Keycloak docker config so you may need to restart the docker container.

**Note:** When running the backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend.
