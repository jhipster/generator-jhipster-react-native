## OAuth 2.0 and OpenID Connect

JHipster React Native uses [Expo's AuthSession library](https://docs.expo.io/versions/latest/sdk/auth-session/) for integrating with Keycloak and Okta.

### Redirect URI Configuration

Configure the redirect URIs for your app in your Identity Provider's authorized redirect URI list.

##### iOS and Android

-   `https://auth.expo.io/@your-expo-username/reactNativeAppName`
    -   Use the value for `reactNativeAppName` in your `.yo-rc.json`
    -   Use your Expo username in place of `@your-expo-username` (run `expo whoami`)
    -   Used for [Expo's Auth Proxy](https://docs.expo.io/versions/latest/sdk/auth-session/#what--authexpoio--does-for-you)

##### Web

-   `http://localhost:19006/`
    -   For local development with `react-native-web`
-   `https://your-app-domain.com/`
    -   For production deployment with `react-native-web`

#### Okta

##### Create a New App

Create a new Single Page App application in Okta's dashboard (or through `okta apps create` with the [Okta CLI](https://cli.okta.com/)). Add the redirect URIs from above.

##### Configure your Client ID

Once your Okta app is configured, modify `app/modules/login/login.sagas.js` to use the new app's client ID:

```js
...
  const { issuer, clientId } = authInfo.data;
  // if using Okta for auth, configure clientId here and remove from above
  // const clientId = '0favl263f83H1kxJk0h7';
  const { accessToken } = yield call(doOauthPkceFlow, clientId, issuer);
...
```

#### Keycloak

Edit `src/main/docker/realm-config/jhipster-realm.json` and add the redirect URIs above to all instances of the `redirectUris` array. Make sure to restart the Keycloak Docker container after making any changes.

**Note:** When running the backend locally for Android, you will need to run the following commands so the app can communicate with both Keycloak and your backend on localhost:

```bash
adb reverse tcp:8080 tcp:8080 && adb reverse tcp:9080 tcp:9080
```
