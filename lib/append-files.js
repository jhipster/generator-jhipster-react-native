function appendFiles() {
    this.fs.append('.gitignore', 'coverage/');
    this.fs.append('.gitignore', '\n# Misc\n#');
    this.fs.append('.gitignore', '.env\n');
    this.fs.append('.gitignore', 'ios/Index/DataStore\n');
    this.fs.append('.gitignore', 'ios/Carthage\n');
    this.fs.append('.gitignore', 'ios/Pods\n');
    this.fs.append('.gitignore', '.artifacts\n');
}
module.exports = {
    appendFiles,
};
