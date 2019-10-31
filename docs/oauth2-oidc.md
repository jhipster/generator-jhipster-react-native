## OAuth2 OIDC

For a full walkthrough of generating and configuring OAuth2 with Ignite JHipster, check out Matt Raible's post ["Build a Mobile App with React Native and Spring Boot"](https://developer.okta.com/blog/2018/10/10/react-native-spring-boot-mobile-app) or [YouTube video](https://www.youtube.com/watch?v=h7QcSe-LYZg) of the same.

### Backend Generated Files

Ignite JHipster generates several files in your JHipster backend's folder. See the changes in your JHipster app.

- `src/main/docker/realm-config/jhipster-realm.json`
  - Adds your app's url scheme as an authorized redirect URI for the Keycloak docker container

**Note:** If you generate your Ignite JHipster app from a JDL file, you will need to make these changes manually.

### URL Scheme

The app's URL scheme is declared in AppConfig, build.gradle, AndroidManifest.xml, and Info.plist. By default it uses your app name.

Add the URL scheme from above as a valid redirect URI, followed by the word "authorize". For example, if your URL scheme is `oauth-app` then the redirect URI
should look like `oauth-app://authorize`. This is patched in JHipster's Keycloak docker config so you may need to restart the docker container.

### Keycloak

When running the backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080 && adb reverse tcp:9080 tcp:9080` so the app can communicate with both Keycloak and your backend.

### Okta

To use Okta with the AppAuth library, you will need to create a new Native application in Okta's dashboard. Make sure PKCE support is enabled, then modify `app/modules/login/login.sagas.js` to use the new client ID:

```js
const { issuer, scope } = authInfo.data
const config = {
 issuer,
 clientId: '0oai3n8l3dgEIfg5k90h7',
 scopes: ['openid', 'profile', 'email', 'address', 'phone', 'offline_access']
 redirectUrl: `${AppConfig.appUrlScheme}://authorize`
}
```
