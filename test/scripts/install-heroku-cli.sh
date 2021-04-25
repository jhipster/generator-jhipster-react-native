#!/usr/bin/env bash
set -exo pipefail

npm install -g heroku

heroku whoami
