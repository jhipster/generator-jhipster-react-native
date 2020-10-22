#!/usr/bin/env bash
set -e

if [ "$PLATFORM" = "ios" ]; then
  # remove the workaround when fixed: https://github.com/actions/virtual-environments/issues/1811
  brew uninstall openssl@1.0.2t
  brew uninstall python@2.7.17
  brew untap local/openssl
  brew untap local/python2

  brew update
  brew tap wix/brew
  brew install applesimutils
fi

npm install -g detox-cli
