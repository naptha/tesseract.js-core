#!/bin/bash

set -euo pipefail

EM_VERSION=3.1.18

docker pull emscripten/emsdk:$EM_VERSION
docker run \
  --rm \
  -v $PWD:/src \
  -v $PWD/wasm/cache:/emsdk/upstream/emscripten/cache \
  emscripten/emsdk:$EM_VERSION \
  sh -c 'bash ./build.sh'
