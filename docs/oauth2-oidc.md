## OAuth 2.0 and OpenID Connect

JHipster React Native uses [Expo's AuthSession library](https://docs.expo.io/versions/latest/sdk/auth-session/) for integrating with Keycloak and Okta.

### Redirect URI Configuration

Configure the redirect URIs for your app in your Identity Provider's authorized redirect URI list.

#### iOS and Android

- `https://auth.expo.io/@your-expo-username/reactNativeAppName`
  - Use the value for `reactNativeAppName` in your `.yo-rc.json`
  - Use your Expo username in place of `@your-expo-username` (run `expo whoami`)
  - Used for [Expo's Auth Proxy](https://docs.expo.io/versions/latest/sdk/auth-session/#what--authexpoio--does-for-you)

#### Web

- `http://localhost:19006/`
  - For local development with `react-native-web`
- `https://your-app-domain.com/`
  - For production deployment with `react-native-web`

### Keycloak

Edit `src/main/docker/realm-config/jhipster-realm.json` and add the redirect URIs above to all instances of the `redirectUris` array. Make sure to restart the Keycloak Docker container after making any changes.

**Note:** When running the backend locally for Android, you will need to run the following commands so the app can communicate with both Keycloak and your backend on localhost:

```bash
adb reverse tcp:8080 tcp:8080 && adb reverse tcp:9080 tcp:9080
```

### Okta

#### Create a New App

Create a new Single Page App application in Okta's dashboard (or through `okta apps create` with the [Okta CLI](https://cli.okta.com/)). Add the redirect URIs from above.

#### Configure your Client ID

Once your Okta app is configured, modify `app/modules/login/login.sagas.js` to use the new app's client ID:

```js
...
  const { issuer, clientId } = authInfo.data;
  // if using Okta for auth, configure clientId here and remove from above
  // const clientId = '0favl263f83H1kxJk0h7';
  const { accessToken } = yield call(doOauthPkceFlow, clientId, issuer);
...
```

#### Add Claims to Access Token

**NOTE:** These steps are only necessary if you are using JHipster v6, or JHipster v7 with a Reactive JHipster backend.

In order to authentication successfully with your React Native app, you have to do a bit more configuration in Okta. Since the React Native client will only send an access token to JHipster, you need to 1) add a `groups` claim to the access token and 2) add a couple more claims so the user's name will be available in JHipster.

Navigate to **API** > **Authorization Servers**, click the **Authorization Servers** tab and edit the **default** one. Click the **Claims** tab and **Add Claim**. Name it "groups" and include it in the Access Token. Set the value type to "Groups" and set the filter to be a Regex of `.*`. Click **Create**.

Add another claim, name it `given_name`, include it in the access token, use `Expression` in the value type, and set the value to `user.firstName`. Optionally, include it in the `profile` scope. Perform the same actions to create a `family_name` claim and use expression `user.lastName`.
