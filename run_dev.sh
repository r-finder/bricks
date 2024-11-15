#!/bin/sh

rm -rf ./dist
mkdir ./dist
npm run watch &
# cp -r ./src/server/* ./dist
# node ./dist/app.js