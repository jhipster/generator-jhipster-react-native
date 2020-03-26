#!/usr/bin/env bash
set -e

# switch to a directory to generate the backend in
rm -rf ../${JHI_IGNITE_APP_NAME}-backend
mkdir ../${JHI_IGNITE_APP_NAME}-backend
cd ../${JHI_IGNITE_APP_NAME}-backend
ls -al
# generate the app
jhipster import-jdl ../${JHI_IGNITE_APP_NAME}.jdl --force --skip-checks --skip-commit-hook --from-cli --force-insight --skip-install
# list files
ls -al
# display jhipster info
jhipster info
