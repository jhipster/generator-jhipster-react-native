#!/usr/bin/env bash
set -ex

cd ../${JHI_REACT_NATIVE_CLIENT_DIR}

npm run lint

npm run test -- -u
