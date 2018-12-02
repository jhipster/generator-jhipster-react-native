#!/usr/bin/env bash

# switch to the directory containing the jhipster app folder
cd ../
# generate the app using the same JDL as the backend
ignite new ${JHI_IGNITE_APP_NAME} -b ${BUILD_REPOSITORY_LOCALPATH} --jdl=./${SYSTEM_JOBNAME}.jdl --e2e=true --disable-insight --skip-git
# list files
ls -al ${JHI_IGNITE_APP_NAME}
