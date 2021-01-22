#!/usr/bin/env bash
set -uo pipefail

echo 'Checking for Expo App...'
./e2e/scripts/download-expo.sh

# get ios device name from detox config
IOS_DEVICE_NAME=$(cat .detoxrc.json | jq -rc '.configurations | .[] | .device | .type')
# get simulator matching that name
DEVICE_ID=$(xcrun simctl list devices -j | jq -rc ".[] | .[] | .[] | select( .name == \"$IOS_DEVICE_NAME\" )  | select( .isAvailable == true ) | .udid")

# boot emulator
echo "Booting emulator: $DEVICE_ID"
xcrun simctl boot $DEVICE_ID
# install Exponent app
echo "Installing Exponent App"
xcrun simctl install $DEVICE_ID e2e/Exponent.app

echo 'Fetching App Bundle from Expo Packager...'
# warm up the app - prebuild the bundle with dev=false and minify=true, otherwise it times out at start of detox test
rep=$(curl -fs "http://127.0.0.1:19000/node_modules/expo/AppEntry.bundle?platform=ios&dev=false&hot=false&minify=true")
status=$?

if [ "$status" -ne 0 ]; then
    echo ''
    echo '****************************************************************************************'
    echo '*  Fetching App Bundle failed - did you start the packager with `npm run start:e2e` ?  *'
    echo '****************************************************************************************'
    exit 1
else
    echo 'Fetched App Bundle from Expo Packager'
fi
