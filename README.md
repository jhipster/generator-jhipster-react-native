# JHipster React Native

[![NPM version](https://badge.fury.io/js/generator-jhipster-react-native.svg)](https://npmjs.org/package/generator-jhipster-react-native)
[![iOS-E2E](https://github.com/jhipster/generator-jhipster-react-native/workflows/iOS-E2E/badge.svg?branch=main)](https://github.com/jhipster/generator-jhipster-react-native/actions?query=workflow%3AiOS-E2E)
[![Generator](https://github.com/jhipster/generator-jhipster-react-native/workflows/Generator/badge.svg?branch=main)](https://github.com/jhipster/generator-jhipster-react-native/actions?query=workflow%3AGenerator)
[![App](https://github.com/jhipster/generator-jhipster-react-native/workflows/App/badge.svg?branch=main)](https://github.com/jhipster/generator-jhipster-react-native/actions?query=workflow%3AApp)

> A React Native blueprint for [JHipster](http://www.jhipster.tech) apps, complete with authentication, an entity generator, JDL support, E2E tests, and more.

<img src="https://raw.githubusercontent.com/jhipster/generator-jhipster-react-native/9f7665e3cafd6032de4a73d469789855b55a4f33/docs/images/jh-rn-logo.png" alt="JHipster React Native" height="200">

> Check out the [blog post](https://dev.to/ruddell/jhipster-react-native-demo-1c54) or [YouTube](https://www.youtube.com/watch?v=zQMg1E7meHw) video for a full demo of JHipster React Native.

## Docs

- [Getting Started](README.md#getting-started)
- [Generators](docs/generators.md)
- [Project Structure](docs/project-structure.md)
- [Distributing and Updating Apps](docs/distributing-and-updating.md)
- [CLI Flags](docs/cli-flags.md)
- JHipster Integrations
  - [OAuth 2.0 and OpenID Connect](docs/oauth2-oidc.md)
  - [WebSockets](docs/websockets.md)
- React Native Library Integrations
  - [Expo](https://docs.expo.io/) - A framework and platform for universal React application
  - [React Native Web](https://docs.expo.io/workflow/web/) - Run your React Native application in a browser, including PWA support
  - [Storybook](docs/storybook.md) - Develop UI components in isolation
  - [Detox](docs/detox.md) - End-to-End Testing and Automation Framework for Mobile Apps
  - [React Navigation](https://reactnavigation.org/docs/getting-started) - Routing and navigation for your React Native apps
  - [Redux](https://redux.js.org/basics/usagewithreact) and [Sagas](https://redux-saga.js.org/) - State management

## Getting Started

### Requirements

- Node LTS v20+
  - Verify version with `node -v`
- [generator-jhipster-react-native](https://github.com/jhipster/generator-jhipster-react-native) installed
  - Install with `npm install -g generator-jhipster-react-native`
- [eas-cli](https://docs.expo.dev/build/introduction/) installed with `npm install -g eas-cli`
- To run your app on an emulator instead of a device, follow the platform-specific instructions:
  - [Android](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS](https://docs.expo.dev/workflow/ios-simulator/)
- JHipster backend must use `jwt` or `oauth2` for its `authenticationType`

### Usage

#### Generate React Native app from JHipster app

Create a JHipster app using `jhipster`, or a backend-only with `jhipster --skip-client`.

Create a directory alongside your JHipster app (ex. `client`), and run `rnhipster` in it.

```bash
+ rootDir/
  + backend/ # run `jhipster` in it.
  + client/  # run `rnhipster` in it.
```

Answer the prompts:

- Enter the path to your JHipster app (default: `../backend`)
- Choose whether to enable E2E Detox Tests

#### Generate JHipster app and React Native app at the same time

You can also create a JHipster app and a React Native app at the same time using the following command:

```bash
jhipster jdl bug-tracker.jdl --blueprints react-native
```

Answer the prompts:

- Enter the path to your React Native app (default: `../client`)

For available options, you can run:

```bash
jhipster-react-native app --help
```

### Configuration

- `app/config/app-config.js` contains your JHipster API URL (default: `http://localhost:8080/`)

#### CORS

- In dev, for the Web build, add `http://localhost:19006` as an allowed origin in the backend CORS config.
- In production, you will need to enable CORS for your deployment domain.

#### Notes for Android

- When running your JHipster backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend.

# License

Apache-2.0 © [Jon Ruddell](https://jruddell.com/)
