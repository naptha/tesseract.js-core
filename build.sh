#!/bin/bash

set -eo pipefail

SCRIPT_ROOT=$(dirname $0)/build-scripts

# verify Emscripten version
emcc -v
echo "installing dependencies"
$SCRIPT_ROOT/install-deps.sh
echo "building zlib"
$SCRIPT_ROOT/build-zlib.sh
echo "building libtiff"
$SCRIPT_ROOT/build-libtiff.sh
echo "building openlibm"
$SCRIPT_ROOT/build-openlibm.sh
echo "building giflib"
$SCRIPT_ROOT/build-giflib.sh
echo "building libpng"
$SCRIPT_ROOT/build-libpng.sh
echo "building libjpeg"
$SCRIPT_ROOT/build-libjpeg.sh
echo "building libwebp"
$SCRIPT_ROOT/build-libwebp.sh
echo "building leptonica"
$SCRIPT_ROOT/build-leptonica.sh
echo "building tesseract"
$SCRIPT_ROOT/build-tesseract.sh

cp ./third_party/tesseract/build/bin/* .
