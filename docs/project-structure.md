# Boilerplate walkthrough

The project structure is as close to JHipster's React client as possible.

`index.js` is the entrypoint of the app. It bootstraps React Native Navigation and sends the user to the launch screen.

## app

Your `app` folder is where most of the files are found in an Ignite JHipster.
Let's walk through them in more detail. Start with the `config` folder and work your way down the walkthrough in order.

### config

Initialize and configure things in this folder.

- `app-config.js` - configuration for your React Native app, contains the JHipster API url and app URL scheme
- `debug-config.js` - define how you want your debug environment to act
- `reactotron-config.js` - configures [Reactotron](https://github.com/infinitered/reactotron) in your project.
- `redux-persist.js` - configures Redux Persist

### modules

#### account

Contains files for handling registration, password management, and user settings.

#### chat (websockets only)

- `chat-screen.js` - shows live chat messages from other users
- `chat-reducer.js` - chat state management

#### entities

- `entities-screen.js` - lists the generated entities and a link to their screen

#### home

- `launch-screen.js` - this is the first screen shown in your application

#### login

- `login-screen.js` - the login screen, contains a login and password input
- `login-reducer.js` - login state management
- `login-sagas.js` - login logic for getting the response from the JHipster backend

### navigation

Your primary and other navigation components reside here.

- `layouts.js` - contains the layout configuration of the app, registers all scenes to the Navigation library, and contains convenience methods for navigating to a specific screen

#### drawer

- `drawer-content.js` - contains the content of the Drawer component that opens from the left side of the screen
- `drawer-button.js` - button used in the drawer-content container

### shared

#### components

Contains shared components such as `alert-message`, `full-button`, `rounded-button`, and `search-bar`.

#### fixtures

Contains json files that mimic API responses for quicker development. These are used by the `app/shared/services/fixture-api.js` object to mock API responses.

#### images

Contains actual images (usually png) used in your application. The images are loaded in `app/shared/themes/images.js`

#### reducers

Contains shared reducers such as `account`, `app-state`, and `user`

#### sagas

Contains shared sagas, similar to the shared reducers

#### services

Contains your API service and other important utilities for your application.

- `api.js` - main API service, giving you an interface to communicate with your back end
- `fixture-api.js` - mocks your API service, making it faster to develop early on in your app
- `rehydration.service.js` - part of the redux-persist implementation

#### themes

Styling themes used throughout your app styles.

- `application.styles.js` - app-wide styles
- `colors.js` - defined colors for your app
- `fonts.js` - defined fonts for your app
- `images.js` - loads and caches images used in your app
- `metrics.js` - useful measurements of things like searchBarHeight

## e2e (optional)

Contains [Detox E2E tests](https://github.com/wix/Detox). These tests run on a device or emulator and follow steps described in the test files. They are very similar to Protractor or Selenium tests.

## test

### spec

Contains sample Jest snapshot and unit tests for your application.

### storybook

[Storybook](https://storybook.js.org/) has been setup to show off components in the different states. Storybook is a great way to develop and test components outside of use in your app. View the Storybook when running on an emulator or local device via the "Storybook" option in the Side Menu. All stores are contained in the `*.story.js` files along side the components.
