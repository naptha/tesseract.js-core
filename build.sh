#!/bin/bash

set -eo pipefail

SCRIPT_ROOT=$(dirname $0)/wasm/build-scripts

# verify Emscripten version
emcc -v
# install dependencies
$SCRIPT_ROOT/install-deps.sh
# build zlib
$SCRIPT_ROOT/build-zlib.sh
# build libtiff
$SCRIPT_ROOT/build-libtiff.sh
# build openlibm
$SCRIPT_ROOT/build-openlibm.sh
# build giflib
$SCRIPT_ROOT/build-giflib.sh
# build libpng
$SCRIPT_ROOT/build-libpng.sh
# build libjpeg
$SCRIPT_ROOT/build-libjpeg.sh
# build libwebp
$SCRIPT_ROOT/build-libwebp.sh
# build leptonica
$SCRIPT_ROOT/build-leptonica.sh
# build tesseract
$SCRIPT_ROOT/build-tesseract.sh
