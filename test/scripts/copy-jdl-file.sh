#!/usr/bin/env bash
if [ "$JHI_DTO" = true ] ; then
  DTO_SUFFIX="-dto"
fi
if [ "$JHI_WEBSOCKETS" = true ] ; then
  WEBSOCKET_SUFFIX="-websockets"
fi

APP_JDL="app-${JHI_AUTH_TYPE}${WEBSOCKET_SUFFIX}.jdl"
ENTITY_JDL="entities${DTO_SUFFIX}.jdl"

echo "Using JDL files: ${APP_JDL} ${ENTITY_JDL}"

# combine the app and entity JDL file
cat ${BUILD_REPOSITORY_LOCALPATH}/test/jdl/${APP_JDL} ${BUILD_REPOSITORY_LOCALPATH}/test/jdl/${ENTITY_JDL} >> ../${SYSTEM_JOBNAME}.jdl
