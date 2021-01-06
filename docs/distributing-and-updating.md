## Expo

For full documentation, refer to the [official Expo Docs](https://docs.expo.io/).

### Distributing Your App
Expo makes it simple to build and deploy your application.  It's only required to build and submit your app to the App Stores when there are changes to native code.  This only happens on upgrades to the Expo SDK.

If you need to have multiple environments (such as `dev` and `prod`), use [Release Channels](https://docs.expo.io/distribution/release-channels/).

#### React Native iOS and Android Apps
For more info, see [Building Standalone Apps](https://docs.expo.io/distribution/building-standalone-apps/).

```bash
npm run build:ios
npm run build:android
```

#### React Native Web Apps (PWAs)
For more info, see [Publishing Websites](https://docs.expo.io/distribution/publishing-websites/).

```bash
npm run build:web
```

### Updating Your App

Expo comes pre-configured with support for Over-the-Air updates.  As mentioned above, you will not need to redeploy your app to the App Stores unless you make changes to your app's version of the Expo SDK.  For more info, see [Configuring OTA Updates](https://docs.expo.io/guides/configuring-ota-updates/).

```bash
npm run publish

# equivalent to
expo publish
```
