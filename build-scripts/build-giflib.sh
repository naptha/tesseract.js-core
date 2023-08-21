#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/giflib
CONF_FLAGS=(
  --prefix=$BUILD_DIR                                 # install library in a build directory for FFmpeg to include
  --enable-shared=no
)

echo "CONF_FLAGS=${CONF_FLAGS[@]}"
if [ $BUILD_CLEAN = 1 ]
then
  make -C $LIB_PATH distclean || echo "Failed to run make -C $LIB_PATH distclean"
fi
(cd $LIB_PATH && autoreconf -f -i && $CONFIGURE_CMD ./configure -C "${CONF_FLAGS[@]}")
$MAKE_CMD -C $LIB_PATH install -j$PROC
