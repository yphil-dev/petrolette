#!/bin/env sh

bower install --allow-root
cd ./node_modules/favrat
npm install
cd ../feedrat
npm install
[ -d favicons-cache ] || mkdir -v favicons-cache
