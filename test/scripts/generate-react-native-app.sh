#!/usr/bin/env bash
set -ex

# switch to the directory containing the jhipster app folder
cd ../

# clear the folder (todo: may not be needed?)
rm -rf ${JHI_REACT_NATIVE_APP_NAME} && mkdir ${JHI_REACT_NATIVE_APP_NAME} && cd ${JHI_REACT_NATIVE_APP_NAME}

if [ "$GITHUB_WORKFLOW" = "iOS-E2E" ] && [ "$JHI_WEBSOCKETS" = true ]; then
    echo "Using Backend Path for Generation"
# generate the app using the backend directory
#  use JHipster directory for oauth2 and websocket apps since they change backend files
  jhipster --blueprints react-native \
  --defaults --no-insight --skip-git
else
    echo "Using JDL for Generation"
# generate the app using the same JDL as the backend
#  use JDL for other apps to test both generation methods
  jhipster --blueprints react-native import-jdl ../${JHI_REACT_NATIVE_APP_NAME}.jdl \
  --defaults --no-insight --skip-git
fi

# list files
ls -al
