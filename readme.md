# Ignite JHipster
[![NPM version][npm-image]][npm-url] [![Build Status][semaphore-image]][semaphore-url] [![Dependency Status][daviddm-image]][daviddm-url]

[![Logo](https://raw.githubusercontent.com/ruddell/ruddell.github.io/master/images/ignite-jhipster/logo-150h.png)](https://github.com/ruddell/ignite-jhipster)

A React Native boilerplate for [JHipster](http://www.jhipster.tech) apps, complete with authentication, an entity generator, and more.

This module uses Infinite Red's [Ignite generator](https://github.com/infinitered/ignite) and is based off of [ignite-ir-boilerplate-2016](https://github.com/infinitered/ignite-ir-boilerplate-2016).  

For a quick tour, check out the [YouTube Demo](https://youtu.be/o46CwsJlL-I).  The tutorial is also available in a [blog format](https://jruddell.com/blog/ignite-jhipster).

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

#### Configuration

 - In `AppConfig.js`, set your JHipster app's API url
 - If you use the UAA auth type and use a uaaBasePath other than `uaa`, configure that variable
 - If you use the Oauth2 auth type and JHipster <=v4.90, set the client ID and client secret from your JHipster app's application.yml

### Generators

##### JHipster Entity Generator
 - Entity - `ignite generate entity <name>`
    - Prompts for the path to the entity's config (`.jhipster` folder in your app)
    - Generates all files needed for fetching and displaying the entity.
    - Includes the API endpoints, redux/saga config, and the user interface
 
##### Ignite Generators
This generator adds Ignite's usual generators to the mix as well.  We have access to:
 - Container - `ignite generate container <name>`
 - Component - `ignite generate component <name>`
 - Listview - `ignite generate listview <name>`
 - Redux - `ignite generate redux <name>`
 - Saga - `ignite generate saga <name>`
 - Screen - `ignite generate screen <name>`
 
### Plugins

Ignite also enables the generated project to add custom plugins.  The benefit of using a plugin is that it installs and links 
third party libraries automatically when adding to a project, you just need to run one command.  You can add a plugin with 
`ignite add plugin-name`.  

Examples of plugins include vector-icons, maps, i18n, firebase, and more.  You can find the [full list
of plugins](https://github.com/infinitered/ignite/blob/master/PLUGINS.md) in the main Ignite repository

Check out [Ignite's documentation](https://github.com/infinitered/ignite/tree/master/docs) for more details. 
 
### JHipster Version Compatibility
JHipster is rapidly changing, so you may need to use a specific version of Ignite JHipster when initially generating 
your project.  Currently, the only restrictions are based on authentication type.

##### UAA Auth Type:
 - JHipster Versions v4.90 and above, use v1.1.0 (coming soon) 
 - JHipster Versions v4.82 and below, use v1.0.0
##### Oauth2 Auth Type:
 - JHipster Versions v4.91 and above is currently unsupporte
 - JHipster Versions v4.90 and below, use v1.0.0
  
 
 
[npm-image]: https://img.shields.io/npm/v/ignite-jhipster.svg
[npm-url]: https://npmjs.org/package/ignite-jhipster
[semaphore-image]: https://semaphoreci.com/api/v1/ruddell/ignite-jhipster/branches/master/shields_badge.svg
[semaphore-url]: https://semaphoreci.com/ruddell/ignite-jhipster
[daviddm-image]: https://david-dm.org/ruddell/ignite-jhipster.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/ignite-jhipster
