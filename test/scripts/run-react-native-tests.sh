#!/usr/bin/env bash
set -ex

cd ../client

npm run lint

npm run test -- -u
