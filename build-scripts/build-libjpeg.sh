#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/libjpeg
CXXFLAGS="$OPTIM_FLAGS"
CM_FLAGS=(
  -DCMAKE_INSTALL_PREFIX=$BUILD_DIR
  -DBUILD_SHARED_LIBS=OFF
)

if [ $BUILD_WASM = 1 ]; then
  export CM_FLAGS+=(-DCMAKE_TOOLCHAIN_FILE=$TOOLCHAIN_FILE)
fi

echo "CM_FLAGS=${CM_FLAGS[@]}"

cd $LIB_PATH
if [ $BUILD_CLEAN = 1 ]
then
  rm -rf build
fi
mkdir -p build
cd build
$CMAKE_CMD .. -DCMAKE_C_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
if [ $BUILD_CLEAN = 1 ]
then
  $MAKE_CMD clean
fi
$MAKE_CMD install -j$PROC
cd $ROOT_DIR
