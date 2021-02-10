#!/usr/bin/env bash
set -exo pipefail

if [[ $OS == *"ubuntu"* ]]; then
    sudo snap install --classic heroku
else
    brew tap heroku/brew
    brew install heroku
fi

heroku whoami
