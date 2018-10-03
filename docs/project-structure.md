## Boilerplate walkthrough

Your `App` folder is where most of the goodies are found in an Ignite Next app. Let's walk through them in more detail. Start with `Containers/App.js` (described below) and work your way down the walkthrough in order.

### Components

React components go here... We won't go through each in detail -- open each file to read the comments and view the code.

#### Storybook

[Storybook](https://storybook.js.org/) has been setup to show off components in the different states. Storybook is a great way to develop and test components outside of use in your app. Simply run `npm run storybook` to get started. All stores are contained in the `*.story.js` files along side the components.

### Config

Initialize and configure things here.

* `AppConfig.js` - simple React Native configuration here, contains the JHipster API url
* `DebugConfig.js` - define how you want your debug environment to act
* `ReactotronConfig.js` - configures [Reactotron](https://github.com/infinitered/reactotron) in your project (Note: this [will be extracted](https://github.com/infinitered/ignite/issues/779) into a plugin in the future)
* `ReduxPersist.js` - configures Redux Persist

### Containers

Containers are (mostly) full screens, although they can be sections of screens or application containers.

* `App.js` - your main application. We create a Redux store and configure it here
* `ChangePasswordScreen.js` - contains the screen for changing a user's password 
* `DrawerContent.js` - contains the content of the Drawer component that opens from the left side of the screen 
* `EntitiesScreen.js` - lists the generated entities and a link to their screen 
* `ForgotPasswordScreen.js` - contains the screen for letting a user reset their password 
* `LaunchScreen.js` - this is the first screen shown in your application. It's loaded into the Navigation component
* `LoginScreen.js` - an example login screen. Read the comments in there to learn more!
* `RegisterScreen.js` - contains the registration page for new users to create an account
* `RootContainer.js` - main view of your application. Contains your status bar and navigation component
* `SettingsScreen.js` - contains the settings page for a user to update their account information
* `Styles` - styling for each of the above containers and screens

### Fixtures

Contains json files that mimic API responses for quicker development. These are used by the `Services/FixtureApi.js` object to mock API responses.

### Images

Contains actual images (usually png) used in your application.

### Lib

We recommend using this folder for modules that can be extracted into their own NPM packages at some point.

### Navigation

Your primary and other navigation components reside here.

* `Layouts.js` - contains your navigation scenes

### Redux, Sagas

Contains a preconfigured Redux and Redux-Sagas setup. Review each file carefully to see how Redux interacts with your application.  Infinite Red has several blog posts which help explain the saga/redux structure  ([here](https://shift.infinite.red/a-tour-of-react-native-part-2-redux-friends-4fed022aaa1e) and [here](https://shift.infinite.red/using-redux-saga-to-simplify-your-growing-react-native-codebase-2b8036f650de)) 

### Services

Contains your API service and other important utilities for your application.

* `Api.js` - main API service, giving you an interface to communicate with your back end
* `FixtureApi.js` - mocks your API service, making it faster to develop early on in your app
* `ImmutablePersistenceTransform.js` - part of the redux-persist implementation
* `RehydrationServices.js` - part of the redux-persist implementation

### Themes

Styling themes used throughout your app styles.

* `ApplicationStyles.js` - app-wide styles
* `Colors.js` - defined colors for your app
* `Fonts.js` - defined fonts for your app
* `Images.js` - loads and caches images used in your app
* `Metrics.js` - useful measurements of things like searchBarHeight

### Transforms

Helpers for transforming data between API and your application and vice versa. An example is provided that you can look at to see how it works.

### Tests

This folder (located as a sibling to `App`) contains sample Jest snapshot and unit tests for your application.
