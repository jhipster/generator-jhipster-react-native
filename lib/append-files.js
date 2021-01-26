function appendFiles() {
  this.fs.append('.gitignore', '/coverage\n');
  this.fs.append('.gitignore', '# Misc\n');
  this.fs.append('.gitignore', '.env\n');
  this.fs.append('.gitignore', 'ios/Index/DataStore\n');
  this.fs.append('.gitignore', 'ios/Carthage\n');
  this.fs.append('.gitignore', 'ios/Pods\n');
  this.fs.append('.gitignore', '/dist\n');
  this.fs.append('.gitignore', '.artifacts\n');
  this.fs.append('.gitignore', 'e2e/Exponent.app\n');
  this.fs.append('.gitignore', '.yo-repository\n');
}
module.exports = {
  appendFiles,
};
