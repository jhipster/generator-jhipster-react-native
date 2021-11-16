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

**Note:** You can do the following steps the Okta Dashboard if preferred.

Using the [Okta CLI](https://cli.okta.com/), run `okta apps create`
- For "Type of Application" choose `Native`
- For "Redirect URI" and "Post Logout Redirect URI" provide `http://localhost:19006/,https://auth.expo.io/@your-expo-username/reactNativeAppName`
  - Change `@your-expo-username` to match your Expo username (run `expo whoami`)
  - Change `reactNativeAppName` to the value provided during generation (look in your `.yo-rc.json`)

Copy the provided `clientId` to `app/config/app-config.js`, and set `nativeClientId` to the copied value.  This is loaded in `login.sagas.js` during authentication.

You can now log in to Okta through React Native clients on iOS, Android, and Web.


#### Add Claims to Access Token

**Note:** These steps are only necessary if you are using JHipster v6, or JHipster v7 with a Reactive JHipster backend.

Follow the instructions under "Add Claims to Access Token" in the [JHipster Ionic ReadMe](https://github.com/oktadeveloper/generator-jhipster-ionic/blob/6d1c64082fe8ca53e44656021b3549c5708764af/README.md#add-claims-to-access-token).

### Log Out from the Identity Provider (iOS/Android)

Expo's auth proxy does not currently work with logging out from the identity provider (supported and enabled on Web).  If you want to completely sign out on native apps:
- Change `useExpoAuthProxy` to `false` in `app-config.js`
- Configure your redirect URLs for logout in your identity provider
  - Usually something like `exp://127.0.0.1:19000` and `exp://10.0.0.114:19000`, where `10.0.0.114` is your local IP
- A popup will appear on browser open, but will say "Expo wants to use identy-provider.com to sign in", but it will really be signing out.
