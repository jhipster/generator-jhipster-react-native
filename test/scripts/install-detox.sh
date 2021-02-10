#!/usr/bin/env bash
set -exo pipefail

if [ "$PLATFORM" = "ios" ]; then
  brew tap wix/brew
  brew install applesimutils
fi
