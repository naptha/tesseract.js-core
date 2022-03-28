#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/libtiff
CONF_FLAGS=(
  --prefix=$BUILD_DIR                                 # install library in a build directory for FFmpeg to include
  --disable-shared
)

echo "CONF_FLAGS=${CONF_FLAGS[@]}"
(cd $LIB_PATH &&  emconfigure ./configure -C "${CONF_FLAGS[@]}")
emmake make -C $LIB_PATH clean
emmake make -C $LIB_PATH install -j
