# Ignite JHipster

[![NPM version][npm-image]][npm-url] [![Build Status][semaphore-image]][semaphore-url] [![Azure Pipelines Status][azure-pipelines-image]][azure-pipelines-url] [![Dependency Status][daviddm-image]][daviddm-url]

[![Logo](https://raw.githubusercontent.com/ruddell/ruddell.github.io/master/images/ignite-jhipster/logo-150h.png)](https://github.com/ruddell/ignite-jhipster)

A React Native boilerplate for [JHipster](http://www.jhipster.tech) apps, complete with authentication, an entity generator, JDL support, E2E tests, and more.

Check out the [Sample Application for Android](https://play.google.com/store/apps/details?id=com.jwtapp&hl=en) or the [presentation at JHipster Conf on YouTube](https://youtu.be/QZMAH2q6ViI).

## Docs

- [Getting Started](README.md#getting-started)
- [Generators](docs/generators.md)
- [Project Structure](docs/project-structure.md)
- JHipster Integrations
  - [OAuth2 OIDC Login](docs/oauth2-oidc.md)
  - [Websockets](docs/websockets.md)
- React Native Integrations
  - [Storybook](docs/storybook.md) - Develop UI components in isolation
  - [fastlane](docs/fastlane.md) - Automate building and releasing your mobile apps
  - [Detox](docs/detox.md) - End-to-End Testing and Automation Framework for Mobile Apps
  - [React Native Navigation](https://github.com/wix/react-native-navigation) - A complete native navigation solution
  - [Redux](https://redux.js.org/basics/usagewithreact) and [Sagas](https://redux-saga.js.org/) - State management
- [Advanced Usage](docs/advanced-usage.md)

## Getting Started

### Requirements

- Node v8+
  - Verify version with `node -v`
- [React Native CLI setup](https://facebook.github.io/react-native/docs/getting-started.html#content)
- [ignite-cli](https://github.com/infinitered/ignite) installed (>= v2.0.0)
  - Install with `npm install -g ignite-cli`
  - Verify version with `ignite --version`
- Mac users require [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) to be installed
  - Verify `pod` installation with `pod install`
- Not required but highly recommended, [Reactotron](https://github.com/infinitered/reactotron) makes debugging much easier and comes pre-configured

To generate an app, run the following command:

```sh
ignite new SampleApp --boilerplate ignite-jhipster
```

Answer the prompts, entering the path to your JHipster app and choosing any plugins you want. The generator will create a new directory containing the project (preconfigured for both iOS and Android).

After generating, you can use the [entity generator, JDL importer, and other commands](docs/generators.md).

### Configuration

`app/config/app-config.js` contains several important variables:

- `apiUrl`: Your JHipster app's API url
- `appUrlScheme`: Your app's URL scheme for deep-linking, this is also configured for iOS (Info.plist) and Android (AndroidManifest.xml) separately.
- `uaaBaseUrl`: (UAA only) If you use a `uaaBasePath` other than `uaa`, configure this variable

#### Notes for Android

- When running your JHipster backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend.
- When building the Android app manually, prepend `app:` to the command (due to React Native Navigation). For example: `./gradlew app:bundleRelease`

[npm-image]: https://img.shields.io/npm/v/ignite-jhipster.svg
[npm-url]: https://npmjs.org/package/ignite-jhipster
[semaphore-image]: https://semaphoreci.com/api/v1/ruddell/ignite-jhipster/branches/master/shields_badge.svg
[semaphore-url]: https://semaphoreci.com/ruddell/ignite-jhipster
[daviddm-image]: https://david-dm.org/ruddell/ignite-jhipster.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/ignite-jhipster
[azure-pipelines-image]: https://dev.azure.com/Ruddell/Ignite%20JHipster/_apis/build/status/ruddell.ignite-jhipster?branchName=master
[azure-pipelines-url]: https://dev.azure.com/Ruddell/Ignite%20JHipster/_build?definitionId=1
