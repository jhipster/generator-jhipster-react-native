#!/usr/bin/env bash

# switch to a directory to generate the backend in
cd ../mono
# package the app into a WAR
./mvnw clean package -Pprod -DskipTests
