## OAuth2 OIDC

**Note:** When running the backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend. Also run `adb reverse tcp:9080 tcp:9080` to enable connections to Keycloak on localhost.
### Native iOS Library Setup

Cocoapods is the usual choice for setting up the native iOS libraries needed for OAuth2 support.  If you didn't have Cocoapods installed before generating your app, [install it](https://guides.cocoapods.org/using/getting-started.html), then run `pod install` from the `ios` directory.  Note that you open the `xcworkspace` file rather than the `xcproject` file when using Cocoapods.  
    
If you don't want to use Cocoapods, follow one of the [other setup instructions for react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth#ios-setup) and delete the `ios/Podfile` file.

### Backend Generated Files

Ignite JHipster generates several files in your JHipster backend's folder.  See the changes in your JHipster app.
- `web.rest.AuthInfoResource`
  - Adds an API endpoint returning OAuth2 issuer information
- `config.ResourceServerConfiguration.java` 
  - Enables authentication using a Bearer token instead of a cookie
- `src/main/docker/realm-config/jhipster-realm.json`
  - Adds your app's url scheme as an authorized redirect URI for the Keycloak docker container

**Note:** If you generate your Ignite JHipster app from a JDL file, you will need to make these changes manually.
   
### URL Scheme
The app's URL scheme is declared in AppConfig, build.gradle, AndroidManifest.xml, and Info.plist.  By default it uses your app name.

#### Keycloak + Okta Configuration
Add the URL scheme from above as a valid redirect URI, followed by the word "authorize".  For example, if your URL scheme is `oauth-app` then the redirect URI
 should look like `oauth-app://authorize`.  This is patched in JHipster's Keycloak docker config so you may need to restart the docker container.
