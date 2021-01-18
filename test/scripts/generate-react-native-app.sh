#!/usr/bin/env bash
set -ex

# switch to a directory to generate the react-native client
rm -rf ../${JHI_REACT_NATIVE_APP_NAME} && mkdir ../${JHI_REACT_NATIVE_APP_NAME} && cd ../${JHI_REACT_NATIVE_APP_NAME}

echo "Using JDL for Generation"
# generate the app using the same JDL as the backend
#  use JDL for other apps to test both generation methods
jhipster --blueprints react-native import-jdl ../${JHI_REACT_NATIVE_APP_NAME}.jdl \
  --defaults --no-insight --skip-git

# list files
ls -al
