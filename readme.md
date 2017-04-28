# ignite-jhipster
[![NPM version][npm-image]][npm-url] [![Build Status][semaphore-image]][semaphore-url] [![Dependency Status][daviddm-image]][daviddm-url]

A React Native boilerplate for JHipster apps.

This module uses Infinite Red's [Ignite generator](https://github.com/infinitered/ignite) and is heavily based off of
 [ignite-ir-boilerplate-2016](https://github.com/infinitered/ignite-ir-boilerplate-2016), but with a few JHipster twists.


## Getting Started
#### Requirements
 - Node v7.6+
    - Verify version with `node -v`
 - [React Native setup](https://facebook.github.io/react-native/docs/getting-started.html#content)
 - [ignite-cli](https://github.com/infinitered/ignite) installed (>= v2.0.0)
    - Install with `npm install -g ignite-cli`
    - Verify version with `ignite --version`

#### Example

```js
ignite new SampleApp --boilerplate ignite-jhipster
```

Answer the prompts (choose your JHipster auth type and any plugins you want) and wait for the project to finish generation.  
The generator will create a new directory containing the project.  It also sets up the Android and iOS app directories.

#### Configuration

In `AppConfig.js`, set your JHipster app's API url.  If you use UAA and use a uaaBasePath other than `uaa`, change that as well.

### Generators

##### JHipster Entity Generator (*coming soon*)
 - Entity - `ignite generate entity <name>`
    - Sets up entity API, listings, detail, and edit pages
 
##### Ignite Generators
This generator adds Ignite's usual generators to the mix as well.  We have access to:
 - Container - `ignite generate container <name>`
 - Component - `ignite generate component <name>`
 - Listview - `ignite generate listview <name>`
 - Redux - `ignite generate redux <name>`
 - Saga - `ignite generate saga <name>`
 - Screen - `ignite generate screen <name>`
 
Check out [Ignite's documentation](https://github.com/infinitered/ignite/tree/master/docs) for more details. 
 
 
### Planned Features:
V1
 - [x] Home Page
 - [x] User Authentication (Login/Logout for JWT, UAA and Oauth2)
 - [x] User Pages (Register, Change/Reset Password, Settings)
 - [ ] Entity Generator - *In Progress*
     - [X] API (Sagas/Redux) 
     - [ ] Listings Page
     - [ ] Detail Page
     - [ ] Edit Page

Later Features
 - [ ] Websocket Support
 - [ ] Admin Pages
 - [ ] Internationalization
 - [ ] Social Login

[npm-image]: https://img.shields.io/npm/v/ignite-jhipster.svg
[npm-url]: https://npmjs.org/package/ignite-jhipster
[semaphore-image]: https://semaphoreci.com/api/v1/ruddell/ignite-jhipster/branches/master/shields_badge.svg
[semaphore-url]: https://semaphoreci.com/ruddell/ignite-jhipster
[daviddm-image]: https://david-dm.org/ruddell/ignite-jhipster.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/ignite-jhipster
