#!/bin/sh

cd source-code
pwd && ls -lha
npm install rimraf && npm install && npm run-script build