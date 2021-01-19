#!/usr/bin/env bash

# start the backend
cd ../${JHI_IGNITE_APP_NAME}-backend

# set backend memory limits
MAVEN_OPTS="-Xmx512m -Xms256m"

# disable sql logging
sed -i.back "s~show-sql: true~show-sql: false~g" src/main/resources/config/application-dev.yml

# start jhipster backend with logging off
LOGGING_LEVEL_ROOT=OFF \
  LOGGING_LEVEL_ORG_ZALANDO=OFF \
  LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_WEB=OFF \
  LOGGING_LEVEL_IO_GITHUB_JHIPSTER=OFF \
  LOGGING_LEVEL_COM_MYCOMPANY_MYAPP=OFF  \
  nohup \
  ./mvnw -ntp &

# wait for the backend to start
# see https://github.com/jhipster/generator-jhipster/blob/2a803eca36f21079320c602645e13c177f6c6ea9/test-integration/scripts/24-tests-e2e.sh
retryCount=1
maxRetry=30
httpUrl="http://localhost:8080/management/health"

rep=$(curl -v -f "$httpUrl")
status=$?
while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
    echo "*** [$(date)] Application not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
    retryCount=$((retryCount+1))
    sleep 10
    rep=$(curl -v "$httpUrl")
    status=$?
done

if [ "$status" -ne 0 ]; then
    echo "*** [$(date)] Not connected after" $retryCount " retries."
    return 1
fi

cd ../${JHI_IGNITE_APP_NAME}

# if oauth, only run the launch screen since you need to authenticate for entities (todo: mock auth for entities)
if [ "$JHI_AUTH_TYPE" = "oauth2" ] ; then
  rm -rf e2e/entities
fi

DETOX_RECORD_VIDEO="none"
if [ "$JHI_RECORD_VIDEO" = "true" ] ; then
  DETOX_RECORD_VIDEO="failing"
fi

# run the detox tests
if [ "$PLATFORM" = "ios" ]; then
  detox test --configuration ios.sim.release --record-videos $DETOX_RECORD_VIDEO
else
  bash ${GITHUB_WORKSPACE}/${SCRIPT_DIR}/start-android-emulator.sh
  detox test --configuration android.emu.release
  DETOX_EXIT_CODE=$?
  echo "Detox Exit Code: ${DETOX_EXIT_CODE}"
  bash ${GITHUB_WORKSPACE}/${SCRIPT_DIR}/stop-android-emulator.sh
  exit $DETOX_EXIT_CODE
fi
