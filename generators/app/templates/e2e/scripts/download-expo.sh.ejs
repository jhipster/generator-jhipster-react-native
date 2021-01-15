#!/usr/bin/env bash

set -euo pipefail
# based on https://github.com/infinitered/ignite/blob/a7eade35a46e19bfa7bb28c2aa595d070e79a0a0/boilerplate/bin/downloadExpoApp.sh
APP_PATH=./e2e/Exponent.app

if [ ! -d $APP_PATH ]; then
  echo "First time running Detox -- downloading Expo client app"

  # Sanity check
  if [ ! -f "package.json" ]; then
    echo "Oops - run this command from your project's root folder" >>/dev/stderr
    exit 1
  fi

  # Make the app dir (this'll also make sure we already have the bin directory)
  mkdir $APP_PATH

  # query expo.io to find most recent ipaUrl
  IPA_URL=`curl --silent --show-error https://expo.io/--/api/v2/versions | python -c 'import sys, json; print json.load(sys.stdin)["iosUrl"]'`

  # download tar.gz
  TMP_PATH=./exponent.tar.gz
  curl --silent --show-error --output $TMP_PATH $IPA_URL

  # unzip tar.gz into APP_PATH
  tar -C $APP_PATH -xzf $TMP_PATH
  rm ./exponent.tar.gz
fi
