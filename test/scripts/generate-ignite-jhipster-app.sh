#!/usr/bin/env bash
set -e

# switch to the directory containing the jhipster app folder
cd ../
# generate the app using the same JDL as the backend

if [ "$JHI_AUTH_TYPE" = "oauth2" ] || [ "$JHI_WEBSOCKETS" = true ]; then
#  use --jh-dir for oauth2 and websocket apps since they change backend files
  ignite new ${JHI_IGNITE_APP_NAME} -b ${BUILD_REPOSITORY_LOCALPATH} --jh-dir=./${SYSTEM_JOBNAME}-backend --detox=true --disable-insight --skip-git
else
#  use --jdl for other apps to test both generation methods
  ignite new ${JHI_IGNITE_APP_NAME} -b ${BUILD_REPOSITORY_LOCALPATH} --jdl=./${SYSTEM_JOBNAME}.jdl --detox=true --disable-insight --skip-git
fi

# list files
ls -al ${JHI_IGNITE_APP_NAME}
