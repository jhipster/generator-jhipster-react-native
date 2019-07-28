#!/usr/bin/env bash
if [ "$JHI_DTO" = true ] ; then
  DTO_SUFFIX="-dto"
fi
if [ "$JHI_WEBSOCKETS" = true ] ; then
  WEBSOCKET_SUFFIX="-websockets"
fi

JDL_FILE="application-with-entities-${JHI_AUTH_TYPE}${DTO_SUFFIX}${WEBSOCKET_SUFFIX}.jdl"

echo "Using JDL file: ${JDL_FILE}"

cp ${BUILD_REPOSITORY_LOCALPATH}/test/.jhipster/${JDL_FILE} ../${SYSTEM_JOBNAME}.jdl
