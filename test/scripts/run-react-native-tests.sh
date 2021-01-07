#!/usr/bin/env bash

cd ../${JHI_REACT_NATIVE_APP_NAME}

npm run lint

npm run test -- -u
