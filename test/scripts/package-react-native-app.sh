#!/usr/bin/env bash
set -e

# switch to the directory containing the react-native app
cd ../${JHI_REACT_NATIVE_APP_NAME}
npm install

if [ "$PLATFORM" = "ios" ]; then
    cd ios && pod install && cd ..
fi

# package the app for detox testing (use release so the react-native JS is packaged)

if [ "$PLATFORM" = "ios" ]; then
  detox build --configuration ios.sim.release
else
  detox build --configuration android.emu.release
fi
