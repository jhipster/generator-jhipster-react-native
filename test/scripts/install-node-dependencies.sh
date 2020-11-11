#!/usr/bin/env bash
set -e

git clone https://github.com/jhipster/generator-jhipster.git ../generator-jhipster
cd ../generator-jhipster && git checkout 819d07f1ca349ae6f8710f2a3387030a29964982 && npm link

# set yarn network-timeout to 10 minutes
yarn config set network-timeout 600000
