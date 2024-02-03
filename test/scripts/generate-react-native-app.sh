#!/usr/bin/env bash
set -exo pipefail

# switch to a directory to generate the react-native server
rm -rf ../${JHI_REACT_NATIVE_APP_NAME} && mkdir ../${JHI_REACT_NATIVE_APP_NAME} && cd ../${JHI_REACT_NATIVE_APP_NAME}

echo "Using JDL for Generation"

# todo: debug fix for why --blueprints flag no longer works for jhipster v7.4.0+
# generate the app using the same JDL as the backend
if [ "$JHIPSTER_VERSION" = "6" ]; then
  rnhipster jdl ../${JHI_REACT_NATIVE_APP_NAME}.jdl \
  --defaults --no-insight --skip-git
else
  jhipster --blueprints react-native jdl ../${JHI_REACT_NATIVE_APP_NAME}.jdl \
  --defaults --no-insight --skip-git
fi

# list files
echo "Listing files in directory: ${JHI_REACT_NATIVE_APP_NAME}"
ls -al
echo "Listing files in directory: ${JHI_REACT_NATIVE_CLIENT_DIR}"
ls -al ../${JHI_REACT_NATIVE_CLIENT_DIR}
