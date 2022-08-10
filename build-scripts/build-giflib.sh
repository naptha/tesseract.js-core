#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/giflib
CONF_FLAGS=(
  --prefix=$BUILD_DIR                                 # install library in a build directory for FFmpeg to include
  --enable-shared=no
)

echo "CONF_FLAGS=${CONF_FLAGS[@]}"
(cd $LIB_PATH && autoreconf -f -i && emconfigure ./configure -C "${CONF_FLAGS[@]}")
emmake make -C $LIB_PATH clean
emmake make -C $LIB_PATH install
