#!/usr/bin/env bash

JDL_FILE="application-with-entities-${JHI_AUTH_TYPE}.jdl"
if [ "$JHI_DTO" = true ] ; then
    JDL_FILE="application-with-entities-${JHI_AUTH_TYPE}-dto.jdl"
fi

echo "Using JDL file: ${JDL_FILE}"

cp ${BUILD_REPOSITORY_LOCALPATH}/test/.jhipster/${JDL_FILE} ../mono.jdl
