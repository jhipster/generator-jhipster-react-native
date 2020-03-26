const { patchInFile } = require('../lib/patch-in-file')
const { copyBatch } = require('../lib/copy-batch')

const patchReactNativeNavigation = async (context = {}, props) => {
  // REACT_NATIVE_NAVIGATION_VERSION
  const { print } = context

  const spinner = print.spin('installing and linking react-native-navigation')
  spinner.start()

  // print.info('Installing and linking react-native-navigation')
  // set java packageName for android patches
  props.packageName = props.name.toLowerCase()

  const navigationFiles = [
    { template: 'AppDelegate.m.ejs', target: `ios/${props.name}/AppDelegate.m` },
    {
      template: 'MainActivity.java.ejs',
      target: `android/app/src/main/java/com/${props.name.toLowerCase()}/MainActivity.java`,
    },
    {
      template: 'MainApplication.java.ejs',
      target: `android/app/src/main/java/com/${props.name.toLowerCase()}/MainApplication.java`,
    },
  ]
  if (props.authType === 'oauth2') {
    navigationFiles.push({
      template: 'AppDelegate.h.ejs',
      target: `ios/${props.name}/AppDelegate.h`,
    })
  }
  await copyBatch(context, navigationFiles, props, {
    quiet: true,
    directory: `${__dirname}/../../templates/react-native-navigation/`,
  })

  await updateIosFiles(context, props)
  await updateAndroidFiles(context)
  spinner.succeed('set up react-native-navigation for iOS/Android')
}
const updateIosFiles = async (context, props) => {
  /*eslint-disable */
  await patchInFile(context, `${process.cwd()}/ios/${props.name}/Info.plist`, {
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
	</array>`,
  })
  /* eslint-enable */
}

const updateAndroidFiles = async (context) => {
  // settings.gradle
  // build.gradle
  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    before: `mavenLocal()`,
    insert: `        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }`,
  })

  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    replace: `classpath("com.android.tools.build:gradle:3.4.2")`,
    insert: `classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.61"
        classpath 'com.android.tools.build:gradle:3.5.3'`,
  })

  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    after: `repositories {`,
    insert: `        google()
        mavenLocal()
        mavenCentral()`,
  })

  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    replace: `minSdkVersion = 16`,
    insert: `minSdkVersion = 19`,
  })

  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    after: `  ext {`,
    insert: `        RNNKotlinVersion = "1.3.61"\n        RNNKotlinStdlib = "kotlin-stdlib-jdk8"`,
  })

  await patchInFile(context, `${process.cwd()}/android/app/build.gradle`, {
    before: `buildTypes {`,
    insert: `    compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
    }`,
  })

  await patchInFile(context, `${process.cwd()}/android/app/build.gradle`, {
    before: `dependencies {`,
    insert: `configurations.all {
      resolutionStrategy.eachDependency { DependencyResolveDetails details ->
          def requested = details.requested
          if (requested.group == 'com.android.support' && (requested.name != 'multidex' && requested.name != 'multidex-instrumentation')) {
              details.useVersion "\${rootProject.ext.supportLibVersion}"
          }
      }
  }`,
  })
}

module.exports = {
  patchReactNativeNavigation,
}
