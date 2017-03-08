# ignite-jhipster

A React Native boilerplate for JHipster apps.

This module uses Infinite Red's [Ignite generator](https://github.com/infinitered/ignite) is heavily based off of [ignite-ir-boilerplate-2016](https://github.com/infinitered/ignite-ir-boilerplate-2016),
 but with a few JHipster twists.

Planned Features:

 - [x] Home Page
 - [ ] User Authentication (Login/Logout)
    - [x] JWT
    - [ ] UAA
    - [ ] OAuth2
    - [ ] Social
 - [ ] User Pages
     - [ ] Register
     - [ ] Reset Password
     - [ ] User Settings
     - [ ] Change Password
  
 - [ ] Entity Generator
     - [ ] API 
     - [ ] Listings Page
     - [ ] Detail Page
     - [ ] Edit Page
 
 - [ ] Websocket Support
 - [ ] Admin Pages (optional)
 - [ ] Internationalization

## Getting Started
The requirements for running the generator include:
 - Node v7.7+
 - [ignite-cli](https://github.com/infinitered/ignite) installed (v2+)
    - Verify version with `ignite --version`

Running the generator will create a new directory containing the project.  It also installs react-native and sets up 
directories for Android and iOS apps.   

#### Example

```js
ignite new SampleApp --boilerplate ignite-jhipster
```

Because the boilerplate is based on Ignite, we gain access to other generators and plugins.  Check out
 [Ignite's documentation](https://github.com/infinitered/ignite/tree/master/docs) for more details. 