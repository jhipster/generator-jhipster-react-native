// See https://github.com/wix/react-native-navigation/issues/3608
var fs = require('fs')
var os = require('os')
var execSync = require('child_process').execSync

// this script only applies to iOS and xcode 10, so it should only run on Macs
if (os.platform() === 'darwin') {
  // this section installs third-party code if missing
  if (!fs.existsSync('node_modules/react-native/third-party')) {
    console.log('Running third-party install script')
    execSync('cd node_modules/react-native ; ./scripts/ios-install-third-party.sh ; cd ../../')
  }

  // this section runs the glog configure script which is currently required for react-native v0.57.x (see release notes)
  console.log('Running glog configure script')
  execSync('cd node_modules/react-native/third-party/glog-0.3.5 ; ../../scripts/ios-configure-glog.sh ; cd ../../../../../')
}
