# ignite-jhipster

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

Entity generator coming soon!  Because the boilerplate is based on Ignite, we also gain access to other generators and plugins:
 - Screen
 - Component
 - Service
 - Redux
 - Saga
 
Check out [Ignite's documentation](https://github.com/infinitered/ignite/tree/master/docs) for more details. 
 
 
### Planned Features:
V1
 - [x] Home Page
 - [x] User Authentication (Login/Logout for JWT, UAA and Oauth2)
 - [x] User Pages (Register, Change/Reset Password, Settings)
 - [ ] Entity Generator - *In Progress*
     - [ ] API 
     - [ ] Listings Page
     - [ ] Detail Page
     - [ ] Edit Page

Later Features
 - [ ] Websocket Support
 - [ ] Admin Pages
 - [ ] Internationalization
 - [ ] Social Login