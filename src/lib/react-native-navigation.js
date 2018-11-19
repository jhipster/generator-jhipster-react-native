const patchReactNativeNavigation = async (context = {}, name) => {
  // REACT_NATIVE_NAVIGATION_VERSION
  const {
    ignite,
    print
  } = context

  const spinner = print.spin('Installing and linking react-native-navigation')
  spinner.start()

  // print.info('Installing and linking react-native-navigation')

  const props = {
    name,
    packageName: name.toLowerCase()
  }
  const navigationFiles = [
    { template: 'AppDelegate.m.ejs', target: `ios/${name}/AppDelegate.m` },
    { template: 'MainActivity.java.ejs', target: `android/app/src/main/java/com/${name.toLowerCase()}/MainActivity.java` },
    { template: 'MainApplication.java.ejs', target: `android/app/src/main/java/com/${name.toLowerCase()}/MainApplication.java` }
  ]
  await ignite.copyBatch(context, navigationFiles, props, {
    // quiet: true,
    directory: `${__dirname}/../../templates/react-native-navigation/`
  })

  spinner.succeed('Set up react-native-navigation for iOS/Android')
  await updateIosFiles(context, props)
  await updateAndroidFiles(context, props)
}
const updateIosFiles = async (context, props) => {
  const {ignite} = context
  /*eslint-disable */
  await ignite.patchInFile(`${process.cwd()}/ios/${props.name}/Info.plist`, {
    before: `<key>CFBundleDisplayName</key>`,
    insert: `
<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLName</key>
			<string>${props.name.toLowerCase()}</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>${props.name.toLowerCase()}</string>
			</array>
		</dict>
	</array>`
  })
  /*eslint-enable */
}

const updateAndroidFiles = async (context, props) => {
  const {ignite} = context
  // settings.gradle
  await ignite.patchInFile(`${process.cwd()}/android/settings.gradle`, {
    after: `include ':app'`,
    insert: `include ':react-native-navigation'\nproject(':react-native-navigation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-navigation/lib/android/app/')`
  })

  // build.gradle
  await ignite.patchInFile(`${process.cwd()}/android/build.gradle`, {
    before: `mavenLocal()`,
    insert: `        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }`
  })

  await ignite.patchInFile(`${process.cwd()}/android/build.gradle`, {
    after: `repositories {`,
    insert: `        google()
        mavenLocal()
        mavenCentral()`
  })

  await ignite.patchInFile(`${process.cwd()}/android/build.gradle`, {
    replace: `buildToolsVersion = "26.0.3"`,
    insert: `buildToolsVersion = "27.0.3"`
  })

  await ignite.patchInFile(`${process.cwd()}/android/build.gradle`, {
    replace: `minSdkVersion = 16`,
    insert: `minSdkVersion = 19`
  })

  // app/build.gradle
  await ignite.patchInFile(`${process.cwd()}/android/app/build.gradle`, {
    after: `versionCode 1`,
    insert: `        missingDimensionStrategy "RNN.reactNativeVersion", "reactNative57"`
  })

  await ignite.patchInFile(`${process.cwd()}/android/app/build.gradle`, {
    before: `buildTypes {`,
    insert: `    compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
    }`
  })

  await ignite.patchInFile(`${process.cwd()}/android/app/build.gradle`, {
    before: `dependencies {`,
    insert: `configurations.all {
      resolutionStrategy.eachDependency { DependencyResolveDetails details ->
          def requested = details.requested
          if (requested.group == 'com.android.support') {
              details.useVersion "\${rootProject.ext.supportLibVersion}"
          }
      }
  }`
  })

  // register url scheme for deep links
  await ignite.patchInFile(`${process.cwd()}/android/app/src/main/AndroidManifest.xml`, {
    before: `android:name=".MainActivity"`,
    insert: `        android:launchMode="singleTask"`
  })
  await ignite.patchInFile(`${process.cwd()}/android/app/src/main/AndroidManifest.xml`, {
    before: `<intent-filter>`,
    insert: `        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="${props.name.toLowerCase()}" />
        </intent-filter>`
  })
}

module.exports = {
  patchReactNativeNavigation
}
