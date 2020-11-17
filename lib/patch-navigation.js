function patchNavigation() {
    // update iOS Files
    this.patchInFile(`ios/${this.reactNativeAppName}/Info.plist`, {
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

    this.patchInFile('ios/Podfile', {
        replace: "platform :ios, '10.0'",
        insert: "platform :ios, '11.0'",
    });

    // fix pod versions
    this.patchInFile('ios/Podfile', {
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
        this.patchInFile(`ios/${this.reactNativeAppName}.xcodeproj/project.pbxproj`, {
            replace: 'IPHONEOS_DEPLOYMENT_TARGET = 10.0;',
            insert: 'IPHONEOS_DEPLOYMENT_TARGET = 11.0;',
            force: true,
        });
    }

    // disable flipper
    this.patchInFile('ios/Podfile', {
        replace: 'use_flipper!',
        insert: '# use_flipper!',
    });
    this.patchInFile('ios/Podfile', {
        replace: 'flipper_post_install',
        insert: '# flipper_post_install',
    });

    // update Android Files
    // settings.gradle
    this.patchInFile('android/build.gradle', {
        after: 'dependencies {',
        insert: '        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$RNNKotlinVersion")',
    });

    this.patchInFile('android/build.gradle', {
        replace: 'minSdkVersion = 16',
        insert: 'minSdkVersion = 19',
    });

    this.patchInFile('android/build.gradle', {
        after: '  ext {',
        insert: '        RNNKotlinVersion = "1.3.61"',
    });

    this.patchInFile('android/app/build.gradle', {
        before: 'buildTypes {',
        insert: `    compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
    }`,
    });

    this.patchInFile('android/app/build.gradle', {
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
    this.patchInFile('android/app/build.gradle', {
        after: 'dependencies {',
        insert: "    implementation 'androidx.multidex:multidex:2.0.1'",
    });
    this.patchInFile('android/app/build.gradle', {
        after: 'versionCode 1',
        insert: '        multiDexEnabled true',
    });
}

function patchNavigationForEntity(name) {
    const upperSnakeCaseName = this._.upperCase(this._.snakeCase(`${name}EntityScreen`)).replace(/ /g, '_');
    const upperSnakeCaseNameEdit = this._.upperCase(this._.snakeCase(`${name}EntityEditScreen`)).replace(/ /g, '_');
    const upperSnakeCaseNameDetail = this._.upperCase(this._.snakeCase(`${name}EntityDetailScreen`)).replace(/ /g, '_');

    const entityScreenFilePath = 'app/modules/entities/entities-screen.js';
    const navigationRouterFilePath = 'app/navigation/layouts.js';

    // import entity screens to navigation
    const navigationImport = `import ${name}EntityScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-screen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImport,
    });
    const navigationImportDetail = `import ${name}EntityDetailScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-detail-screen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImportDetail,
    });
    const navigationImportEdit = `import ${name}EntityEditScreen from '../modules/entities/${this.kebabCaseName}/${this.kebabCaseName}-entity-edit-screen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-import-needle',
        insert: navigationImportEdit,
    });

    // import entity screens to navigation
    const navigationDeclaration = `export const ${upperSnakeCaseName} = 'nav.${name}EntityScreen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclaration,
    });
    const navigationDeclarationDetail = `export const ${upperSnakeCaseNameDetail} = 'nav.${name}EntityDetailScreen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclarationDetail,
    });
    const navigationDeclarationEdit = `export const ${upperSnakeCaseNameEdit} = 'nav.${name}EntityEditScreen'`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-declaration-needle',
        insert: navigationDeclarationEdit,
    });

    const getNavCase = (SCREEN_NAME, component) => `registerComponentWithRedux(${SCREEN_NAME}, ${component})`;
    // add entity screens to navigation
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-registration-needle',
        insert: getNavCase(upperSnakeCaseName, `${name}EntityScreen`),
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-registration-needle',
        insert: getNavCase(upperSnakeCaseNameDetail, `${name}EntityDetailScreen`),
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-registration-needle',
        insert: getNavCase(upperSnakeCaseNameEdit, `${name}EntityEditScreen`),
    });

    const navigationMethodMain = `
export const ${this.camelCaseName}EntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: ${upperSnakeCaseName},
      options: {
        topBar: {
          title: {
            text: '${this.pluralName}',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: '${this.camelCaseName}CreateButton',
            },
          ],
        },
      },
    },
  })`;

    const navigationMethodDetail = `
export const ${this.camelCaseName}EntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ${upperSnakeCaseNameDetail},
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: '${this.pluralName}',
            color: Colors.snow,
          },
        },
      },
    },
  })`;
    const navigationMethodEdit = `
export const ${this.camelCaseName}EntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ${upperSnakeCaseNameEdit},
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: '${this.pluralName}',
            color: Colors.snow,
          },
        },
      },
    },
  })`;
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-method-needle',
        insert: navigationMethodMain,
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-method-needle',
        insert: navigationMethodEdit,
    });
    this.patchInFile(navigationRouterFilePath, {
        before: 'jhipster-react-native-navigation-method-needle',
        insert: navigationMethodDetail,
    });
    // add entity to entities screen
    const entityScreenButton = `        <RoundedButton text="${name}" onPress={${this.camelCaseName}EntityScreen} testID="${this.camelCaseName}EntityScreenButton" />`;
    this.patchInFile(entityScreenFilePath, {
        before: 'jhipster-react-native-entity-screen-needle',
        insert: entityScreenButton,
    });
    const entityScreenImport = `  ${this.camelCaseName}EntityScreen,`;
    this.patchInFile(entityScreenFilePath, {
        before: 'jhipster-react-native-entity-screen-import-needle',
        insert: entityScreenImport,
    });
}

module.exports = {
    patchReactNativeNavigation: patchNavigation,
    patchNavigationForEntity,
};
