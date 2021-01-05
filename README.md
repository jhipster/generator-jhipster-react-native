# JHipster React Native

[![NPM version](https://badge.fury.io/js/generator-jhipster-react-native.svg)](https://npmjs.org/package/generator-jhipster-react-native)
[![iOS-E2E](https://github.com/ruddell/jhipster-react-native/workflows/iOS-E2E/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AiOS-E2E)
[![Android-E2E](https://github.com/ruddell/jhipster-react-native/workflows/Android-E2E/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AAndroid-E2E)
[![Generator](https://github.com/ruddell/jhipster-react-native/workflows/Generator/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AGenerator)
[![App](https://github.com/ruddell/jhipster-react-native/workflows/App/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AApp)

> A React Native blueprint for [JHipster](http://www.jhipster.tech) apps, complete with authentication, an entity generator, JDL support, E2E tests, and more.

<img src="https://raw.githubusercontent.com/ruddell/ignite-jhipster/9f7665e3cafd6032de4a73d469789855b55a4f33/docs/images/jh-rn-logo.png" alt="JHipster React Native" height="200">

## Docs

-   [Getting Started](README.md#getting-started)
-   [Generators](docs/generators.md)
-   [Project Structure](docs/project-structure.md)
-   JHipster Integrations
    -   [OAuth2 OIDC Login](docs/oauth2-oidc.md)
    -   [Websockets](docs/websockets.md)
-   React Native Library Integrations
    -   [Expo](https://docs.expo.io/) - A framework and platform for universal React application
    -   [Storybook](docs/storybook.md) - Develop UI components in isolation
    -   [Detox](docs/detox.md) - End-to-End Testing and Automation Framework for Mobile Apps
    -   [React Navigation](https://github.com/wix/react-native-navigation) - A complete native navigation solution
    -   [Redux](https://redux.js.org/basics/usagewithreact) and [Sagas](https://redux-saga.js.org/) - State management
-   [CLI Flags](docs/cli-flags.md)

## Getting Started

### Requirements

-   Node v12+
    -   Verify version with `node -v`
-   [jhipster-react-native](https://github.com/ruddell/jhipster-react-native) installed
    -   Install with `npm install -g generator-jhipster-react-native`
-   [expo-cli](https://docs.expo.io/get-started/installation/) installed
    -   Install with `npm install -g expo-cli`
    -   To run your app on an emulator instead of a device, follow the platform-specific instructions:
        -   [Android](https://docs.expo.io/workflow/android-studio-emulator/)
        -   [iOS](https://docs.expo.io/workflow/ios-simulator/)
-   JHipster backend must use JWT or OAuth2 auth types.

Create a directory for your app:

```sh
mkdir SampleApp && cd SampleApp
```

To generate an app, run the following command:

```sh
# JHipster v7+
jhipster --blueprints react-native

# JHipster v7+ JDL Application
jhipster --blueprints react-native import-jdl ./path-to-your-app-config.jdl

# JHipster v6.x
rnhipster
```

Answer the prompts:

-   Enter the path to your JHipster app
-   Choose whether you want to enable E2E Detox Tests

After generating, you can import entities with the [entity generator and JDL importer](docs/generators.md).

### Configuration

-   `app/config/app-config.js` contains your JHipster API URL (default: `http://localhost:8080/`)

#### Notes for Android

-   When running your JHipster backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend.

# License

Apache-2.0 © [Jon Ruddell](https://jruddell.com/)
