#!/usr/bin/env bash

# switch to the directory containing the jhipster app folder
cd ../
# generate the app using the same JDL as the backend
ignite new JwtApp -b ${BUILD_REPOSITORY_LOCALPATH} --jdl=./mono.jdl --disable-insight --skip-git
# list files
ls -al JwtApp
