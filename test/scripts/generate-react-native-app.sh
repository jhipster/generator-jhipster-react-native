#!/usr/bin/env bash
set -exo pipefail

echo "Using JDL for Generation"

if [ -d "../backend" ]; then
  echo "Using React Native for Generation using ../backend folder"
  rm -rf ../client && mkdir ../client && cd ../client
  rnhipster --force
else
  echo "Using JHipster for Generation. Both backend and frontend will be generated."
  mkdir ../backend && cd ../backend
  rnhipster --blueprints react-native jdl ../${JHI_REACT_NATIVE_APP_NAME}.jdl \
  --defaults --no-insight --skip-git    
  # list backend files
  echo "Listing files in directory: ../backend"
  ls -al
fi

# list client files
cd ../client
npm install
echo "Listing files in directory: ../client"
ls -al
