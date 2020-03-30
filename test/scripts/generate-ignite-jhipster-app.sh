#!/usr/bin/env bash
set -e
set -x;

# switch to the directory containing the jhipster app folder
cd ../
rm -rf ${JHI_IGNITE_APP_NAME}
# generate the app using the same JDL as the backend
SKIP_POD_INSTALL=""
if [ "$PLATFORM" = "android" ]; then
  SKIP_POD_INSTALL=" --skip-pod-install"
fi


if [ "$JHI_AUTH_TYPE" = "oauth2" ] || [ "$JHI_WEBSOCKETS" = true ]; then
#  use --jh-dir for oauth2 and websocket apps since they change backend files
  ignite new ${JHI_IGNITE_APP_NAME} -b ${GITHUB_WORKSPACE} --jh-dir=./${JHI_IGNITE_APP_NAME}-backend --detox=true --disable-insight --skip-git ${SKIP_POD_INSTALL}
else
#  use --jdl for other apps to test both generation methods
  ignite new ${JHI_IGNITE_APP_NAME} -b ${GITHUB_WORKSPACE} --jdl=./${JHI_IGNITE_APP_NAME}.jdl --detox=true --disable-insight --skip-git ${SKIP_POD_INSTALL}
fi

# list files
ls -al ${JHI_IGNITE_APP_NAME}
