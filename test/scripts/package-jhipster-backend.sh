#!/usr/bin/env bash

set -e

# switch to a directory to generate the backend in
mkdir ../${SYSTEM_JOBNAME}-backend
cd ../${SYSTEM_JOBNAME}-backend
ls -al
# generate the app
jhipster import-jdl ../${SYSTEM_JOBNAME}.jdl --force --skip-checks --skip-git --skip-commit-hook --from-cli --force-insight --skip-install
# list files
ls -al
# display jhipster info
jhipster info

# switch to a directory to generate the backend in
# package the app into a WAR
./mvnw clean package -Pprod -DskipTests
