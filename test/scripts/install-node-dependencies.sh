#!/usr/bin/env bash
set -exo pipefail

# install EAS, Sharp (for images), JHipster, and Detox CLIs
npm i -g eas-cli sharp-cli generator-jhipster@$JHIPSTER_VERSION detox-cli
