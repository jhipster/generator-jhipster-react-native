# Boilerplate walkthrough

The project structure is as close to JHipster's React client as possible.

`App.js` is the entrypoint of the app. It bootstraps React Navigation and sends the user to the launch screen.

## app

Your `app` folder is where most of the files are located in a JHipster React Native app.
Let's walk through them in more detail. Start with the `config` folder and work your way down the walkthrough in order.

### config

Initialize and configure things in this folder.

-   `app-config.js` - configuration for your React Native app
-   `redux-persist.js` - configures Redux Persistence

### modules

#### account

Contains files for handling registration, password management, and user settings.

#### chat (websockets only)

-   `chat-screen.js` - shows live chat messages from other users
-   `chat-reducer.js` - chat state management

#### entities

-   `entities-screen.js` - lists the generated entities and links to their screens

#### home

-   `home-screen.js` - this is the first screen shown in your application

#### login

-   `login-screen.js` - the login screen, contains a login and password input
-   `login-reducer.js` - login state management
-   `login-sagas.js` - login logic for getting the response from the JHipster backend

### navigation

Your primary and other navigation components reside here.

-   `entity-stack.js` - navigation configuration for all entity routes
-   `nav-container.js` - navigation configuration for all base routes
-   `nav-ref.js` - reference to the `navigation` object, allows navigating outside of a component
-   `modal-screen.js` - displays a modal on top of the application

#### drawer

-   `drawer-content.js` - contains the content of the Drawer Menu component
-   `drawer-button.js` - button used to toggle the Drawer Menu

### shared

#### components

Contains shared components such as `alert-message`, `form`, `rounded-button`, and `search-bar`.

##### form

Contains custom input components to handle each of JHipster's data types

#### fixtures

Contains json files that mimic API responses for quicker development. These are used by the `app/shared/services/fixture-api.js` object to mock API responses.

#### images

Contains actual images (usually png) used in your application. The images are loaded in `app/shared/themes/images.js`

#### reducers

Redux configuration, contains shared reducers such as `account`, `app-state`, and `user`

#### sagas

Saga configuration, contains shared sagas

#### services

Contains your API service and other important utilities for your application.

-   `api.js` - main API service, giving you an interface to communicate with your back end
-   `fixture-api.js` - mocks your API service, making it faster to develop early on in your app
-   `rehydration.service.js` - part of the redux-persist implementation, allows resetting reducer data by incrementing the version

#### themes

Styling themes used throughout your app styles.

-   `application.styles.js` - app-wide styles
-   `colors.js` - defined colors for your app
-   `fonts.js` - defined fonts for your app
-   `images.js` - loads and caches images used in your app
-   `metrics.js` - standard measurements of margins, icons, and more

## assets

Contains favicon, splash screen, and app icon image files

## e2e (optional)

Contains [Detox E2E tests](https://github.com/wix/Detox). These tests run on a device or emulator and follow steps described in the test files. They are very similar to Protractor or Selenium tests.

## patches

Contains patches for npm dependencies.

-   KeyboardAwareScrollView is patched to improve the jerky scroll animation
-   SectionedMultiSelect is patched to fix label display on multi-select inputs

## storybook

[Storybook](https://storybook.js.org/) is configured to show off components in the different states. Storybook is a great way to develop and test components outside of use in your app. View the Storybook when running on an emulator or local device via the "Storybook" option in the Side Menu. All stores are contained in the `*.story.js` files along side the components.

## test

-   `setup.js` - configures Jest mocks

### spec

Contains sample Jest snapshot and unit tests for your application.
