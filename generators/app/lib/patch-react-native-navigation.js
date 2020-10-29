const { patchInFile } = require('./patch-in-file');

function patchReactNativeNavigation() {
    const navigationFiles = [
        { template: 'ios/AppDelegate.m.ejs', target: `ios/${this.reactNativeAppName}/AppDelegate.m` },
        {
            template: 'android/MainActivity.java.ejs',
            target: `android/app/src/main/java/com/${this.reactNativeAppName.toLowerCase()}/MainActivity.java`,
        },
        {
            template: 'android/MainApplication.java.ejs',
            target: `android/app/src/main/java/com/${this.reactNativeAppName.toLowerCase()}/MainApplication.java`,
        },
    ];
    navigationFiles.forEach(f => this.template(f.template, f.target, this));

    // update iOS Files
    patchInFile(`ios/${this.reactNativeAppName}/Info.plist`, {
        before: '<key>CFBundleDisplayName</key>',
        insert: `
<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLName</key>
			<string>${this.reactNativeAppName.toLowerCase()}</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>${this.reactNativeAppName.toLowerCase()}</string>
			</array>
		</dict>
	</array>`,
    });
    /* eslint-enable */

    patchInFile('ios/Podfile', {
        replace: "platform :ios, '10.0'",
        insert: "platform :ios, '11.0'",
    });

    // fix pod versions
    patchInFile('ios/Podfile', {
        before: 'flipper_post_install',
        insert: `    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '11.0'
      end
    end
`,
    });

    for (let i = 0; i < 4; i++) {
        // align IPHONEOS_DEPLOYMENT_TARGET
        patchInFile(`ios/${this.reactNativeAppName}.xcodeproj/project.pbxproj`, {
            replace: 'IPHONEOS_DEPLOYMENT_TARGET = 10.0;',
            insert: 'IPHONEOS_DEPLOYMENT_TARGET = 11.0;',
            force: true,
        });
    }

    // disable flipper
    patchInFile('ios/Podfile', {
        replace: 'use_flipper!',
        insert: '# use_flipper!',
    });
    patchInFile('ios/Podfile', {
        replace: 'flipper_post_install',
        insert: '# flipper_post_install',
    });

    // update Android Files
    // settings.gradle
    patchInFile('android/build.gradle', {
        after: 'dependencies {',
        insert: '        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$RNNKotlinVersion")',
    });

    patchInFile('android/build.gradle', {
        replace: 'minSdkVersion = 16',
        insert: 'minSdkVersion = 19',
    });

    patchInFile('android/build.gradle', {
        after: '  ext {',
        insert: '        RNNKotlinVersion = "1.3.61"',
    });

    patchInFile('android/app/build.gradle', {
        before: 'buildTypes {',
        insert: `    compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
    }`,
    });

    patchInFile('android/app/build.gradle', {
        before: 'dependencies {',
        insert: `
    configurations.all {
      resolutionStrategy.eachDependency { DependencyResolveDetails details ->
          def requested = details.requested
          if (requested.group == 'com.android.support' && (requested.name != 'multidex' && requested.name != 'multidex-instrumentation')) {
              details.useVersion "\${rootProject.ext.supportLibVersion}"
          }
      }
  }`,
    });
    patchInFile('android/app/build.gradle', {
        after: 'dependencies {',
        insert: "    implementation 'androidx.multidex:multidex:2.0.1'",
    });
    patchInFile('android/app/build.gradle', {
        after: 'versionCode 1',
        insert: '        multiDexEnabled true',
    });
}

module.exports = {
    patchReactNativeNavigation,
};
