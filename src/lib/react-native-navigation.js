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
  await updateAndroidFiles(context, props)
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

  await patchInFile(context, `${process.cwd()}/ios/Podfile`, {
    replace: `platform :ios, '10.0'`,
    insert: `platform :ios, '11.0'`,
  })

  // fix pod versions
  await patchInFile(context, `${process.cwd()}/ios/Podfile`, {
    before: `flipper_post_install`,
    insert: `    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '11.0'
      end
    end
`,
  })

  for (let i = 0; i < 4; i++) {
    // align IPHONEOS_DEPLOYMENT_TARGET
    await patchInFile(context, `${process.cwd()}/ios/${props.name}.xcodeproj/project.pbxproj`, {
      replace: `IPHONEOS_DEPLOYMENT_TARGET = 10.0;`,
      insert: `IPHONEOS_DEPLOYMENT_TARGET = 11.0;`,
      force: true
    })
  }


  // disable flipper
  await patchInFile(context, `${process.cwd()}/ios/Podfile`, {
    replace: `use_flipper!`,
    insert: `# use_flipper!`,
  })
  await patchInFile(context, `${process.cwd()}/ios/Podfile`, {
    replace: `flipper_post_install`,
    insert: `# flipper_post_install`,
  })
}

const updateAndroidFiles = async (context) => {
  // settings.gradle
  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    after: `dependencies {`,
    insert: `        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$RNNKotlinVersion")`,
  })

  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    replace: `minSdkVersion = 16`,
    insert: `minSdkVersion = 19`,
  })

  await patchInFile(context, `${process.cwd()}/android/build.gradle`, {
    after: `  ext {`,
    insert: `        RNNKotlinVersion = "1.3.61"`,
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
    insert: `
    configurations.all {
      resolutionStrategy.eachDependency { DependencyResolveDetails details ->
          def requested = details.requested
          if (requested.group == 'com.android.support' && (requested.name != 'multidex' && requested.name != 'multidex-instrumentation')) {
              details.useVersion "\${rootProject.ext.supportLibVersion}"
          }
      }
  }`,
  })
  await patchInFile(context, `${process.cwd()}/android/app/build.gradle`, {
    after: `dependencies {`,
    insert: `    implementation 'androidx.multidex:multidex:2.0.1'`,
  })
  await patchInFile(context, `${process.cwd()}/android/app/build.gradle`, {
    after: `versionCode 1`,
    insert: `        multiDexEnabled true`,
  })
}

module.exports = {
  patchReactNativeNavigation,
}
