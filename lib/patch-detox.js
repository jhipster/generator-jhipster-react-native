function patchDetox() {
    if (this.detox) {
        // patch files for android detox
        this.patchInFile('android/app/build.gradle', {
            after: 'dependencies {',
            insert: '    androidTestImplementation(project(path: ":detox"))',
        });
        this.patchInFile('android/app/build.gradle', {
            after: 'versionName "1.0"',
            insert: `
        testBuildType System.getProperty('testBuildType', 'debug')  // This will later be used to control the test apk build type
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'`,
        });

        this.patchInFile('android/settings.gradle', {
            after: "include ':app'",
            insert: `
include ':detox'
project(':detox').projectDir = new File(rootProject.projectDir, '../node_modules/detox/android/detox')`,
        });

        this.patchInFile('android/app/src/main/AndroidManifest.xml', {
            after: 'android:allowBackup="false"',
            insert: '      android:usesCleartextTraffic="true"',
        });
    }
}
module.exports = {
    patchDetox,
};
