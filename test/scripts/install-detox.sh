#!/usr/bin/env bash
set -e

if [ "$PLATFORM" = "ios" ]; then
  brew tap wix/brew
  brew install applesimutils
fi

npm install -g detox-cli
