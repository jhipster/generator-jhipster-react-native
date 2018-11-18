#!/usr/bin/env bash

# switch to the directory containing the ignite-jhipster app
cd ../JwtApp

# package the app for detox testing (use release so the react-native JS is packaged)
detox build --configuration ios.sim.release
