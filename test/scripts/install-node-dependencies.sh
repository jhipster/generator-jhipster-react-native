#!/usr/bin/env bash
set -exo pipefail

# install npm v7
npm i -g npm@7

# install expo, JHipster, and Detox CLIs
npm i -g generator-jhipster@$JHIPSTER_VERSION detox-cli
