# JHipster React Native

[![NPM version](https://badge.fury.io/js/generator-jhipster-react-native.svg)](https://npmjs.org/package/generator-jhipster-react-native)
[![iOS-E2E](https://github.com/ruddell/jhipster-react-native/workflows/iOS-E2E/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AiOS-E2E)
[![Android-E2E](https://github.com/ruddell/jhipster-react-native/workflows/Android-E2E/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AAndroid-E2E)
[![Generator](https://github.com/ruddell/jhipster-react-native/workflows/Generator/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AGenerator)
[![App](https://github.com/ruddell/jhipster-react-native/workflows/App/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AApp)

> A React Native blueprint for [JHipster](http://www.jhipster.tech) apps, complete with authentication, an entity generator, JDL support, E2E tests, and more.

**Note:** The intial version of this blueprint (v4) generates the same application as [Ignite JHipster v3](https://github.com/ruddell/ignite-jhipster/tree/2d84fb2956fc62d6dea29e07c314838689c55f67)

## Docs

-   [Getting Started](README.md#getting-started)
-   [Generators](docs/generators.md)
-   [Project Structure](docs/project-structure.md)
-   JHipster Integrations
    -   [OAuth2 OIDC Login](docs/oauth2-oidc.md)
    -   [Websockets](docs/websockets.md)
-   React Native Library Integrations
    -   [Storybook](docs/storybook.md) - Develop UI components in isolation
    -   [fastlane](docs/fastlane.md) - Automate building and releasing your mobile apps
    -   [Detox](docs/detox.md) - End-to-End Testing and Automation Framework for Mobile Apps
    -   [React Native Navigation](https://github.com/wix/react-native-navigation) - A complete native navigation solution
    -   [Redux](https://redux.js.org/basics/usagewithreact) and [Sagas](https://redux-saga.js.org/) - State management
-   [Advanced Usage](docs/advanced-usage.md)

## Getting Started

### Requirements

-   Node v12+
    -   Verify version with `node -v`
-   [React Native CLI setup](https://reactnative.dev/docs/environment-setup)
-   [jhipster-react-native](https://github.com/ruddell/jhipster-react-native) installed
    -   Install with `npm install -g generator-jhipster-react-native`
-   Mac users require [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) to be installed
    -   Verify `pod` installation with `pod install`

Create a directory for your app:

```sh
mkdir SampleApp && cd SampleApp
```

To generate an app, run the following command:

```sh
rnhipster

# Acceptable with JHipster v7+
jhipster --blueprints react-native
```

Answer the prompts, entering the path to your JHipster app and choosing any plugins you want. The generator will create a new directory containing the project (preconfigured for both iOS and Android).

After generating, you can use the [entity generator and JDL importer](docs/generators.md).

### Configuration

`app/config/app-config.js` contains several important variables:

-   `apiUrl`: Your JHipster app's API url
-   `appUrlScheme`: Your app's URL scheme for deep-linking, this is also configured for iOS (Info.plist) and Android (AndroidManifest.xml) separately.
-   `uaaBaseUrl`: (UAA only) If you use a `uaaBasePath` other than `uaa`, configure this variable

#### Notes for Android

-   When running your JHipster backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend.
-   When building the Android app manually, prepend `app:` to the command (due to React Native Navigation). For example: `./gradlew app:bundleRelease`

# License

Apache-2.0 © [Jon Ruddell](https://jruddell.com/)
