#!/usr/bin/env bash

# switch to a directory to generate the backend in
mkdir ../mono
cd ../mono

# generate the app
jhipster import-jdl ../mono.jdl --force --skip-checks --skip-git --skip-commit-hook --from-cli --force-insight --skip-install
# list files
ls -al
# display jhipster info
jhipster info
