#!/usr/bin/env bash
set -ex

if [ "$PLATFORM" = "ios" ]; then
  brew tap wix/brew
  brew install applesimutils
fi
