#!/usr/bin/env bash
set -e

npm install -g generator-jhipster ignite-cli@3 --ignore-scripts spawn-sync

# set yarn network-timeout to 10 minutes
yarn config set network-timeout 600000
