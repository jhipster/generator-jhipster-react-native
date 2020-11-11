#!/usr/bin/env bash
set -e
set -x;

# switch to the directory containing the jhipster app folder
cd ../

# clear the folder (todo: may not be needed?)
rm -rf ${JHI_REACT_NATIVE_APP_NAME} && mkdir ${JHI_REACT_NATIVE_APP_NAME} && cd ${JHI_REACT_NATIVE_APP_NAME}

if [ "$JHI_AUTH_TYPE" = "oauth2" ] || [ "$JHI_WEBSOCKETS" = true ]; then
# generate the app using the backend directory
#  use JHipster directory for oauth2 and websocket apps since they change backend files
  jhipster --blueprints react-native \
  --defaults --no-insight --skip-git --skip-install
else
# generate the app using the same JDL as the backend
#  use JDL for other apps to test both generation methods
  jhipster --blueprints react-native import-jdl ../${JHI_REACT_NATIVE_APP_NAME}.jdl \
  --defaults --no-insight --skip-git --skip-install
fi

# list files
ls -al
