#!/usr/bin/env bash

cd ../${JHI_REACT_NATIVE_APP_NAME}

npm i

npm run lint

npm run test
