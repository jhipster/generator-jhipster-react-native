const fsjetpack = require('fs-jetpack');

function appendGitIgnore() {
    fsjetpack.append('.gitignore', 'coverage/');
    fsjetpack.append('.gitignore', '\n# Misc\n#');
    fsjetpack.append('.gitignore', '.env\n');
    fsjetpack.append('.gitignore', 'ios/Index/DataStore\n');
    fsjetpack.append('.gitignore', 'ios/Carthage\n');
    fsjetpack.append('.gitignore', 'ios/Pods\n');
    fsjetpack.append('.gitignore', 'fastlane/report.xml\n');
    fsjetpack.append('.gitignore', 'android/app/bin\n');
}
module.exports = {
    appendGitIgnore,
};
