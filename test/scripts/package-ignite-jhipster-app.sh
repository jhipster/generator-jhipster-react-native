#!/usr/bin/env bash
set -e

# switch to the directory containing the ignite-jhipster app
cd ../${JHI_IGNITE_APP_NAME}

# package the app for detox testing (use release so the react-native JS is packaged)

if [ "$PLATFORM" = "ios" ]; then
  detox build --configuration ios.sim.release
else
  detox build --configuration android.emu.release
fi
