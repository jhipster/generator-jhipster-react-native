#!/usr/bin/env bash
set -e

# switch to the directory the backend was generated in
cd ../${JHI_IGNITE_APP_NAME}-backend
ls -al

# show files modified by ignite-jhipster
git status

# package the app into a WAR
# this is currently unused, todo: test with backend in prod mode
# ./mvnw clean package -Pprod -DskipTests -ntp
