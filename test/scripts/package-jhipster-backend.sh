#!/usr/bin/env bash
set -ex

# switch to the directory the backend was generated in
cd ../backend
ls -al

# show files modified by jhipster-react-native
git status

# package the app into a WAR
# this is currently unused, todo: test with backend in prod mode
# ./mvnw clean package -Pprod -DskipTests -ntp
