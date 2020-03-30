#!/usr/bin/env bash
set -e

if [ "$PLATFORM" = "ios" ]; then
  brew update
  brew tap wix/brew
  brew install applesimutils
fi

npm install -g detox-cli
