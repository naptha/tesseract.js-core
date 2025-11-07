#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/openlibm
if [ $BUILD_CLEAN = 1 ]
then
  $MAKE_CMD -C $LIB_PATH clean
fi
$MAKE_CMD -C $LIB_PATH ARCH=wasm32 prefix=$BUILD_DIR install-static -j$PROC
