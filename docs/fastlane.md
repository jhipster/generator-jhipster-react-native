## fastlane

- Currently, fastlane is officially supported to run on macOS.

[fastlane](https://github.com/fastlane/fastlane) automates building and releasing your mobile apps. It can handle all tedious tasks, like generating screenshots, dealing with code signing, and releasing your application.

The fastlane files are generated under the `fastlane` folder at the root of the project. When running fastlane, the outcome depends on the platform:

- For iOS, provisioning profiles are checked/updated, the app is built, signed with release keys, uploaded to TestFlight, and released to beta testers.
- For Android, the app is built, signed with release keys, uploaded to Google Play, and released to a beta track.

### Configuration

#### Appfile

Contains information identifying your app.

#### Fastfile

fastlane uses a "lane" concept, which is similar to a function or method. A lane contains logic for building and uploading your app to the app stores. The generated Fastfile contains two lanes, one for each platform (iOS and Android).

#### Matchfile

Used for [fastlane match](https://docs.fastlane.tools/actions/match/), which shares one code signing identity across your development team to simplify your codesigning setup and prevent code signing issues.

### Running fastlane

To run the iOS lane:

```sh
fastlane ios build
```

To run the Android lane:

```sh
fastlane android build
```

**Note**: You must upload the first AAB/APK file to Google Play manually before using fastlane.

For more information on configuration for fastlane, check the [official fastlane documentation](https://docs.fastlane.tools/).
