#!/usr/bin/env bash
set -e

# use the specified app JDL file, or default to app.jdl
APP_JDL=${JHI_APP_JDL:-"app.jdl"}

# use the specified entity JDL file, or default to entities.jdl
ENTITY_JDL=${JHI_ENTITY_JDL:-"entities.jdl"}

echo "Using JDL files: ${APP_JDL} ${ENTITY_JDL}"
echo "Using Options: ${APP_JDL} ${ENTITY_JDL}"

# combine the app and entity JDL file
cat test/jdl/${APP_JDL} test/jdl/${ENTITY_JDL} >> ../${JHI_REACT_NATIVE_APP_NAME}.jdl

echo "      Auth Type: ${JHI_AUTH_TYPE}"
sed -i.back "s~authenticationType jwt~authenticationType ${JHI_AUTH_TYPE}~g" ../${JHI_REACT_NATIVE_APP_NAME}.jdl

echo "      Websockets: ${JHI_WEBSOCKETS}"
if [ "$JHI_WEBSOCKETS" = true ] ; then
    sed -i.back "s~websocket false~websocket spring-websocket~g" ../${JHI_REACT_NATIVE_APP_NAME}.jdl
fi

echo "      DTO:        ${JHI_DTO}"
if [ "$JHI_DTO" = true ] ; then
    echo "dto * with mapstruct" >> ../${JHI_REACT_NATIVE_APP_NAME}.jdl
fi

echo ""
echo ""
echo "Using JDL:"
echo ""
echo ""

cat ../${JHI_REACT_NATIVE_APP_NAME}.jdl
