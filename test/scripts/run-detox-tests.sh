#!/usr/bin/env bash
set -e

# start the backend
cd ../${SYSTEM_JOBNAME}-backend
nohup ./mvnw -ntp &

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

# run the detox tests
detox test --configuration ios.sim.release
