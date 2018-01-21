# Ignite JHipster
[![NPM version][npm-image]][npm-url] [![Build Status][semaphore-image]][semaphore-url] [![Dependency Status][daviddm-image]][daviddm-url]

[![Logo](https://raw.githubusercontent.com/ruddell/ruddell.github.io/master/images/ignite-jhipster/logo-150h.png)](https://github.com/ruddell/ignite-jhipster)

A React Native boilerplate for [JHipster](http://www.jhipster.tech) apps, complete with authentication, an entity generator, and more.

This module uses Infinite Red's [Ignite generator](https://github.com/infinitered/ignite) and is based off of [ignite-ir-boilerplate-2016](https://github.com/infinitered/ignite-ir-boilerplate-2016).  

For a quick tour, check out the [Sample Application for Android](https://play.google.com/store/apps/details?id=com.jwtapp&hl=en), the [YouTube Demo](https://youtu.be/o46CwsJlL-I) or the [blog post](https://jruddell.com/blog/ignite-jhipster).

## Docs
 - [App Config Variables](docs/config-variables.md)
 - [Generators and Plugins](docs/generators-and-plugins.md)
 - [Project Structure](docs/project-structure.md)
 - [Social Login](docs/social-login.md)
 - [Websockets](docs/websockets.md)
 - [JHipster Version Compatibility](docs/jhipster-version-compatability.md)
 - [Upgrading Your IgniteJHipster App](docs/upgrading.md)
 - [Advanced Usage](docs/advanced-usage.md)

## Getting Started
#### Requirements
 - Node v7.6+
    - Verify version with `node -v`
 - [React Native setup](https://facebook.github.io/react-native/docs/getting-started.html#content)
 - [ignite-cli](https://github.com/infinitered/ignite) installed (>= v2.0.0)
    - Install with `npm install -g ignite-cli`
    - Verify version with `ignite --version`
 - Not required, [Reactotron](https://github.com/infinitered/reactotron) makes debugging super simple and comes preconfigured

To generate an app, run the following command:
```js
ignite new SampleApp --boilerplate ignite-jhipster
```

Answer the prompts (choose your JHipster auth type, search engine, and any plugins you want) and wait for the project to finish generation.  

The generator will create a new directory containing the project.  It also sets up the Android and iOS app directories.

[npm-image]: https://img.shields.io/npm/v/ignite-jhipster.svg
[npm-url]: https://npmjs.org/package/ignite-jhipster
[semaphore-image]: https://semaphoreci.com/api/v1/ruddell/ignite-jhipster/branches/master/shields_badge.svg
[semaphore-url]: https://semaphoreci.com/ruddell/ignite-jhipster
[daviddm-image]: https://david-dm.org/ruddell/ignite-jhipster.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/ignite-jhipster
