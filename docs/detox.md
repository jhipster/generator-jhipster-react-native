## Detox

Currently, Detox only supports iOS/macOS and does not support tests requiring authentication for OAuth2 apps.

If enabled during generation, [Detox](https://github.com/wix/Detox) is configured for the project. Sample tests are available for the account screens, and are generated for entity screens when you add an entity. For example:

- [`e2e/settings-screen.spec.js`](https://github.com/ruddell/ignite-jhipster/blob/53d1d3e9cd5bd4fbba5ca8b20d7334a9b7ad24f4/boilerplate/e2e/settings-screen.spec.js)
- [`e2e/login-screen.spec.js`](https://github.com/ruddell/ignite-jhipster/blob/main/boilerplate/e2e/login-screen.spec.js)

To run the tests, you need to build the app for debug or release:

```sh
detox build --configuration ios.sim.debug
detox build --configuration ios.sim.release
```

Then run the tests using the same configuration from above:

```sh
detox test --configuration ios.sim.debug --reuse
detox test --configuration ios.sim.release --reuse
```

For more information on configuration and writing tests for Detox, check the [official Detox documentation](https://github.com/wix/Detox/blob/master/docs/README.md).
