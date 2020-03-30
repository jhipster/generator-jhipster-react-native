#!/usr/bin/env bash
set -e

echo "y" | $ANDROID_HOME/tools/bin/sdkmanager --install 'system-images;android-29;default;x86_64' > /dev/null

$ANDROID_HOME/platform-tools/adb devices

echo "no" | $ANDROID_HOME/tools/bin/avdmanager create avd -n Nexus_6_API_29 -k 'system-images;android-29;default;x86_64' --force  > /dev/null

nohup $ANDROID_HOME/emulator/emulator -avd Nexus_6_API_29 -no-snapshot > /dev/null 2>&1 & $ANDROID_HOME/platform-tools/adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\r') ]]; do sleep 1; done; input keyevent 82'

# disable animations
$ANDROID_HOME/platform-tools/adb shell settings put global window_animation_scale 0.0
$ANDROID_HOME/platform-tools/adb shell settings put global transition_animation_scale 0.0
$ANDROID_HOME/platform-tools/adb shell settings put global animator_duration_scale 0.0

echo "Emulator started"
