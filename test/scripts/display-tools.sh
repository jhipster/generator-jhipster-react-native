#!/usr/bin/env bash
#set -e

git version
java -version
node -v
npm -v
# not currently installed
#docker version
#docker-compose version
pwd
ignite doctor

if [ "$PLATFORM" = "ios" ]; then
  applesimutils --list
else
  echo $ANDROID_HOME
fi
env
