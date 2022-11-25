#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/openlibm
if [ $BUILD_CLEAN = 1 ]
then
  emmake make -C $LIB_PATH clean
fi
emmake make -C $LIB_PATH prefix=$BUILD_DIR install -j$PROC
