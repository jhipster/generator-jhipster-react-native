const patchReactNativeNavigation = async (context = {}, name) => {
  // REACT_NATIVE_NAVIGATION_VERSION
  const {
    ignite,
    print
  } = context

  const spinner = print.spin('Installing and linking react-native-navigation')
  spinner.start()

  // print.info('Installing and linking react-native-navigation')
  spinner.succeed('Installed and linking react-native-navigation')

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
  await updateAndroidFiles(context)
}
const updateAndroidFiles = async (context) => {
  const { ignite } = context

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
    replace: `classpath 'com.android.tools.build:gradle:2.3.3'`,
    insert: `classpath 'com.android.tools.build:gradle:3.1.3'`
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
    insert: `missingDimensionStrategy "RNN.reactNativeVersion", "reactNative56"`
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

  await ignite.patchInFile(`${process.cwd()}/android/app/build.gradle`, {
    after: `// From node_modules`,
    insert: `    implementation project(':react-native-navigation')`
  })
  // gradle-wrapper.properties
  await ignite.patchInFile(
    `${process.cwd()}/android/gradle/wrapper/gradle-wrapper.properties`,
    {
      replace: 'gradle-3.5.1-all.zip',
      insert: 'gradle-4.4-all.zip',
      force: true
    }
  )
}

module.exports = {
  patchReactNativeNavigation
}
