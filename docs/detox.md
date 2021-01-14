## Detox

Currently, Detox only supports iOS/macOS and does not support tests requiring authentication for OAuth2 apps.

If enabled during generation, [Detox](https://github.com/wix/Detox) is configured for the project. Sample tests are available for the account screens, and are generated for entity screens when you add an entity. For example:

-   [`e2e/settings-screen.spec.js`](https://github.com/ruddell/generator-jhipster-react-native/blob/main/generators/app/templates/e2e/account/settings-screen.spec.js.ejs)
-   [`e2e/login-screen.spec.js`](https://github.com/ruddell/generator-jhipster-react-native/blob/main/generators/app/templates/e2e/account/login-screen.spec.js.ejs)

To run the Detox tests:

```sh
npm run test:e2e
```

To customize the build and test parameters (such as which device to test), modify the `.detoxrc.json` file found in the root of the project.

For more information on Detox configuration and writing tests, check the [official Detox documentation](https://github.com/wix/Detox/blob/master/docs/README.md).
