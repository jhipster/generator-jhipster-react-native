#!/usr/bin/env bash
set -e

brew update
brew tap wix/brew
brew install applesimutils
npm install -g detox-cli
