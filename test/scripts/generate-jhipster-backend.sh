#!/usr/bin/env bash
set -exo pipefail

# switch to a directory to generate the backend
rm -rf ../backend && mkdir ../backend && cd ../backend

# generate the app
jhipster jdl ../${JHI_REACT_NATIVE_APP_NAME}.jdl --force --skip-checks --skip-commit-hook --no-insight --skip-install

# list files
ls -al

# display jhipster info
jhipster info
