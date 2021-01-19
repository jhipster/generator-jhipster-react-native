#!/usr/bin/env bash

# start the backend
cd ../backend

# set backend memory limits
export MAVEN_OPTS="-Xmx512m -Xms256m"

# disable sql logging
sed -i.back "s~org.hibernate.SQL: DEBUG~org.hibernate.SQL: WARN~g" src/main/resources/config/application-dev.yml

if [ "$JHI_AUTH_TYPE" = "jwt" ] ; then
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
    maxRetry=60
    httpUrl="http://localhost:8080/management/health"
    rep=$(curl -fv "$httpUrl")
    status=$?
    while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
        echo "*** [$(date)] Backend not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
        retryCount=$((retryCount+1))
        sleep 5
        rep=$(curl -fv "$httpUrl")
        status=$?
        echo "."
    done

    if [ "$status" -ne 0 ]; then
        echo "*** [$(date)] Backend not connected after" $retryCount " retries."
        exit 1
    fi
else
    echo "Skipping starting backend for OAuth2"
    echo "TODO: Mock Auth so that the entity pages can be tested"
fi

# switch to react-native app directory
cd ../${JHI_REACT_NATIVE_APP_NAME}

# start the expo react-native packager
npm run start:e2e &

# verify the npm packager has started (takes less time than the backend, so should not be an issue)
retryCount=1
maxRetry=60
httpUrl="http://localhost:19000"
rep=$(curl -fv "$httpUrl")
status=$?
while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
    echo "*** [$(date)] Expo Packager not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
    retryCount=$((retryCount+1))
    sleep 5
    rep=$(curl -fv "$httpUrl")
    status=$?
done

if [ "$status" -ne 0 ]; then
    echo "*** [$(date)] Expo Packager not connected after" $retryCount " retries."
    exit 1
fi

# if oauth, only run the launch screen since you need to authenticate for entities
if [ "$JHI_AUTH_TYPE" = "oauth2" ] ; then
  rm -rf e2e/entities
fi

DETOX_RECORD_VIDEO="none"
if [ "$JHI_RECORD_VIDEO" = "true" ] ; then
  DETOX_RECORD_VIDEO="failing"
fi

# run the detox tests
if [ "$PLATFORM" = "ios" ]; then
  npm run test:e2e -- --record-videos failing
else
  bash ${GITHUB_WORKSPACE}/${SCRIPT_DIR}/start-android-emulator.sh
  detox test --configuration android.emu.release
  DETOX_EXIT_CODE=$?
  echo "Detox Exit Code: ${DETOX_EXIT_CODE}"
  bash ${GITHUB_WORKSPACE}/${SCRIPT_DIR}/stop-android-emulator.sh
  exit $DETOX_EXIT_CODE
fi
