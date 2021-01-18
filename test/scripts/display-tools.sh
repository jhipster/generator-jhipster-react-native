#!/usr/bin/env bash
set -x

pwd

git version
java -version
node -v
npm -v

if [ "$PLATFORM" = "ios" ]; then
  applesimutils --list
else
  echo $ANDROID_HOME
fi

env
