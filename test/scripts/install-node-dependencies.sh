#!/usr/bin/env bash
set -e

# set up main branch of generator-jhipster
git clone https://github.com/jhipster/generator-jhipster.git ../generator-jhipster
cd ../generator-jhipster && npm link

# set up main branch of jhipster-bom
git clone https://github.com/jhipster/jhipster-bom.git ../jhipster-bom
cd ../jhipster-bom && ./mvnw clean install -Dgpg.skip -ntp -DskipTests

# set yarn network-timeout to 10 minutes
yarn config set network-timeout 600000
