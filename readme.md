# Ignite JHipster
[![NPM version][npm-image]][npm-url] [![Build Status][semaphore-image]][semaphore-url] [![Azure Pipelines Status][azure-pipelines-image]][azure-pipelines-url] [![Dependency Status][daviddm-image]][daviddm-url] 

[![Logo](https://raw.githubusercontent.com/ruddell/ruddell.github.io/master/images/ignite-jhipster/logo-150h.png)](https://github.com/ruddell/ignite-jhipster)

A React Native boilerplate for [JHipster](http://www.jhipster.tech) apps, complete with authentication, an entity generator, E2E tests, and more.  

For a quick tour, check out the [Sample Application for Android](https://play.google.com/store/apps/details?id=com.jwtapp&hl=en), the [YouTube Demo](https://youtu.be/o46CwsJlL-I) or the [blog post](https://jruddell.com/blog/ignite-jhipster).

Uses the following libraries:
 - [Ignite](https://github.com/infinitered/ignite) - Infinite Red's React Native app generator 
 - [React Native Navigation](https://github.com/wix/react-native-navigation) - A complete native navigation solution
 - [Redux](https://redux.js.org/basics/usagewithreact) and [Sagas](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html) - State management
 - [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Icons from Ionicons, Font Awesome, and more
 - [Detox](https://github.com/wix/Detox) - End-to-End Testing and Automation Framework for Mobile Apps
 

## Docs
 - [Getting Started](readme.md#getting-started)
 - [App Config Variables](docs/config-variables.md)
 - [Generators and Plugins](docs/generators-and-plugins.md)
 - [Project Structure](docs/project-structure.md)
 - [OAuth2 OIDC Login](docs/oauth2-oidc.md)
 - [Websockets](docs/websockets.md)
 - [Upgrading Your Ignite JHipster App](docs/upgrading.md)
 - [Advanced Usage](docs/advanced-usage.md)

## Getting Started
#### Requirements
 - Node v8+
    - Verify version with `node -v`
 - [React Native setup](https://facebook.github.io/react-native/docs/getting-started.html#content)
 - [ignite-cli](https://github.com/infinitered/ignite) installed (>= v2.0.0)
    - Install with `npm install -g ignite-cli`
    - Verify version with `ignite --version`
 - OAuth2 iOS apps require [Cocoapods](https://guides.cocoapods.org/using/getting-started.html) to be installed
 - Not required but highly recommended, [Reactotron](https://github.com/infinitered/reactotron) makes debugging super simple and comes preconfigured

To generate an app, run the following command:
```js
ignite new SampleApp --boilerplate ignite-jhipster
```

Answer the prompts, entering the path to your JHipster app and choosing any plugins you want. The generator will create a new directory containing the project (preconfigured for both iOS and Android).

After generating, you can use the [entity generator, JDL importer, and other commands](docs/generators-and-plugins.md).

**Note:** When running your JHipster backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend.

[npm-image]: https://img.shields.io/npm/v/ignite-jhipster.svg
[npm-url]: https://npmjs.org/package/ignite-jhipster
[semaphore-image]: https://semaphoreci.com/api/v1/ruddell/ignite-jhipster/branches/master/shields_badge.svg
[semaphore-url]: https://semaphoreci.com/ruddell/ignite-jhipster
[daviddm-image]: https://david-dm.org/ruddell/ignite-jhipster.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/ignite-jhipster
[azure-pipelines-image]: https://dev.azure.com/Ruddell/Ignite%20JHipster/_apis/build/status/ruddell.ignite-jhipster?branchName=master
[azure-pipelines-url]: https://dev.azure.com/Ruddell/Ignite%20JHipster/_build?definitionId=1
