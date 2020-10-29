const fs = require('fs-extra');
const { patchInFile } = require('./patch-in-file');

function patchDetox() {
    if (this.detox) {
        // patch files for android detox
        patchInFile('android/app/build.gradle', {
            after: 'dependencies {',
            insert: '    androidTestImplementation(project(path: ":detox"))',
        });
        patchInFile('android/app/build.gradle', {
            after: 'versionName "1.0"',
            insert: `
        testBuildType System.getProperty('testBuildType', 'debug')  // This will later be used to control the test apk build type
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'`,
        });

        patchInFile('android/settings.gradle', {
            after: "include ':app'",
            insert: `
include ':detox'
project(':detox').projectDir = new File(rootProject.projectDir, '../node_modules/detox/android/detox')`,
        });

        patchInFile('android/app/src/main/AndroidManifest.xml', {
            after: 'android:allowBackup="false"',
            insert: '      android:usesCleartextTraffic="true"',
        });

        fs.mkdirp(`android/app/src/androidTest/java/com/${this.androidPackageName}`);
        const detoxFiles = [
            {
                template: 'android/DetoxTest.java',
                target: `android/app/src/androidTest/java/com/${this.androidPackageName}/DetoxTest.java`,
            },
        ];
        detoxFiles.forEach(f => this.template(f.template, f.target, this));
    }
}
module.exports = {
    patchDetox,
};
